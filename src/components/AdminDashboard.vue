<template lang="html">
  <div class="admin container center card-panel">
    <h2>Admin dashboard</h2>
    <br>
    <div class="participantList">
      <h5>Actives</h5>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current buddy</th>
            <th>Met with buddy?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in active_users" :key="index">
            <td>{{ index+1 }}
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.buddy_email }}</td>
            <td>{{ user.met_buddy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <div class="non-participantList">
      <h5>Inactives</h5>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current buddy</th>
            <th>Met with buddy?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in inactive_users" :key="index">
            <td>{{ index+1 }}
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.buddy_email }}</td>
            <td>{{ user.met_buddy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <button @click="setUserArray" class="btn blue">Get User Data</button>
    <button @click="clearBuddies" class="btn blue">Clear Buddy History</button>
    <div class="initiatePairs container center card-panel">
      <h4>Initiate pairing (complete weekly)</h4>
      <button @click="setUserArray" class="btn blue">1. Refresh User Data</button>
      <button v-if="include_admin" @click="toggleInclude" class="btn blue">2. Include admin</button>
      <button v-if="!include_admin" @click="toggleInclude" class="btn grey">2. Don't include admin</button>
      <button @click="assignPairs" class="btn blue">3. Assign Pairs</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      users: [],
      active_users: [],
      active_met_users: [],
      inactive_users: [],
      active_users_with_histories: [],
      db_reference: null,
      include_admin: true
    }
  },
  created() {
    this.db_reference = firebase.firestore().collection('users')
  },
  methods: {
    setUserArray() {
      var self = this
      self.users = []
      self.active_users = []
      self.active_users_with_histories = []
      self.inactive_users = []
      self.active_met_users = []
      self.db_reference.get().then(snapshot => {
        snapshot.forEach(doc => {
          self.users.push(doc.data())
          if(doc.data().status_active == true) {
            self.active_users.push(doc.data())
            if(doc.data().met_buddy == true || doc.data().buddy_email == null) {
              self.active_met_users.push(doc.data())
            }
          } else {
            self.inactive_users.push(doc.data())
          }
        })
      })
      console.log(self.active_met_users)
    },
    assignPairs() {
      var self = this
      var pairs = []
      var active_users1 = self.active_met_users.slice()
      var duplicates = true
      var count = 0
      while(duplicates && count < 100 ) {
        count++
        pairs = []
        active_users1.sort(() => {return 0.5-Math.random()})
        for (var i = 0; i < active_users1.length; i+=2) {
          pairs.push({
            email1: active_users1[i].email,
            email2: active_users1[i+1].email
          })
        }
        duplicates = this.checkForDuplicates(pairs)
      }
      for (var i = 0; i < pairs.length; i++) {
        self.db_reference.doc(pairs[i].email1).update({
          buddy_email: pairs[i].email2,
        })
        self.db_reference.doc(pairs[i].email2).update(
          { buddy_email: pairs[i].email1 }
        )
      }
      this.updateBuddyList()
      this.sendEmailReminder()
    },
    checkForDuplicates(pairs) {
        for (var i = 0; i < this.active_met_users.length; i++) {
          var new_buddy = this.newBuddy(this.active_met_users[i].email, pairs)
          var current_history = this.active_met_users[i].past_buddies
          for (var j = 0; j < current_history.length; j++) {
            if(current_history[j] == new_buddy || this.active_met_users[i].buddy_email == new_buddy) {
              return true
            }
          }
        }
        return false
    },
    newBuddy(email, pairs) {
      for (var i = 0; i < pairs.length; i++) {
        if(pairs[i].email1 == email) {
          return pairs[i].email2
        } else if(pairs[i].email2 == email) {
          return pairs[i].email1
        }
      }
    },
    updateBuddyList() {
      firebase.firestore().collection('users').get()
      .then (snapshot => {
       snapshot.forEach(doc => {
         var buddy_email = doc.data().buddy_email
         var past_buddies = doc.data().past_buddies
         past_buddies.push(buddy_email)
         firebase.firestore().collection('users').doc(doc.data().email).set(
           { past_buddies: past_buddies },
           { merge: true }
         )
       })
     }).then(this.resetMetBuddy)
   },
   clearBuddies() {
     firebase.firestore().collection('users').get()
     .then (snapshot => {
      snapshot.forEach(doc => {
        firebase.firestore().collection('users').doc(doc.data().email).update(
          { past_buddies: ['n/a'] }
          )
        })
      })
    },
    toggleInclude() {
      this.include_admin = !this.include_admin
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email).update({
        status_active: this.include_admin
      })
    },
    resetMetBuddy() {
      var userRef = firebase.firestore().collection('users')
      userRef.where('status_active','==',true).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          userRef.doc(doc.data().email).update({ met_buddy: false })
        })
      })
    },
    sendEmailReminder() {
      var sendEmail = firebase.functions().httpsCallable('sendEmail')
      console.log(this.active_met_users)
      for (var i = 0; i < this.active_met_users.length; i++) {
        console.log(this.active_met_users[i].email)
        sendEmail({ email: this.active_met_users[i].email })
      }
    }
  }
}
</script>
<style lang="css">
</style>

<template lang="html">
  <div class="container center card-panel">
    <h2>Admin dashboard</h2>
    <br>
    <div class="participantList">
      <h5>Actives</h5>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Met with buddy?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in active_users">
            <td>{{ user.name }}</td>
            <td>{{ user.met_buddy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <button @click="setUserArray" class="btn blue">Set User Array</button>
    <button @click="assignPairs" class="btn blue">Assign Pairs</button>
    <button @click="clearBuddies" class="btn blue">Clear Buddy History</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      users: [],
      active_users: [],
      active_users_with_histories: [],
      db_reference: null
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
      self.db_reference.get().then(snapshot => {
        snapshot.forEach(doc => {
          self.users.push(doc.data())
          if(doc.data().status_active == true) {
            self.active_users.push(doc.data())
            self.active_users_with_histories.push({
              email: doc.data().email,
              past_buddies: doc.data().past_buddies,
              buddy_email: doc.data().buddy_email
            })
          }
        })
      })
    },
    assignPairs() {
      var self = this
      var pairs = []
      var active_users1 = self.active_users.slice()
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
    },
    checkForDuplicates(pairs) {
        for (var i = 0; i < this.active_users_with_histories.length; i++) {
          var new_buddy = this.newBuddy(this.active_users_with_histories[i].email, pairs)
          var current_history = this.active_users_with_histories[i].past_buddies
          for (var j = 0; j < current_history.length; j++) {
            if(current_history[j] == new_buddy || this.active_users_with_histories[i].buddy_email == new_buddy) {
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
     })
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
   }
  }
}
</script>

<style lang="css">
</style>

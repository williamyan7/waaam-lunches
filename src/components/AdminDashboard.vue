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
          <tr v-for="user in users">
            <td>{{ user.name }}</td>
            <td>{{ user.met_buddy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <button @click="assignPairs" class="btn blue">Assign Pairs</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      users: [],
    }
  },
  firestore() {
    return {
      users: firebase.firestore().collection('users'),
    }
    // var self = this
    // console.log('hello')
    // firebase.firestore().collection('users').where('status_active','==', true).get()
    // .then (snapshot => {
    //   snapshot.forEach(doc => {
    //     self.users.push({
    //        name: doc.data().name,
    //        met_buddy: doc.data().met_buddy
    //      })
    //      console.log(doc.data().name)
    //   })
    // })
  },
  methods: {
    assignPairs() {
      console.log('clicked')
      console.log(this.users[0])
    }
  }
}
</script>

<style lang="css">
</style>

<template lang="html">
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center blue-text">Signup</h2>
      <div class="field">
        <label for="name">Name:</label>
        <input type="text" name="name" v-model="name">
      </div>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn blue">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from '@/firebase/init'

export default {
  name: 'Signup',
  data() {
    return {
      name: null,
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    signup() {
      const ref = firebase.firestore().collection('users')
      if(this.name && this.email && this.password){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          ref.doc(cred.user.email).set({
                name: this.name,
                email: this.email,
              })
            }).then(() => {this.$router.push({ name: 'Home' })})
            .catch(err => {
              console.log(err)
              this.feedback = err.message})
          }
       else {
        this.feedback = 'Please complete all fields.'
      }
    }
  }
}
</script>

<style lang="css">
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2{
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px
}
</style>

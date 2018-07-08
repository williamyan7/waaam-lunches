<template lang="html">
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <div class="field" >
      <h2 class="center blue-text">Login</h2>
        <label for="email" class="label">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password" class="label">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn blue">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from '@/firebase/init'
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.$router.push({ name: 'Home' })
      }).catch(error => {
        this.feedback = error.message
      })
    }
  }
}
</script>

<style lang="css">
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2{
  font-size: 2.4em;
}
.login .field {
  margin-bottom: 16px
}
.label {
  font-size: 1em;
}
</style>

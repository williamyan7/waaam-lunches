<template lang="html">
  <div class="signup">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center blue-text">Signup</h2>
      <div class="field">
        <label for="name" class="label">Name:</label>
        <input type="text" name="name" v-model="name">
      </div>
      <div class="field">
        <label for="email" class="label">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password" class="label">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="confirmPassword" class="label">Confirm Password:</label>
        <input type="password" name="confirmPassword" v-model="confirmPassword">
      </div>
      <div class="field">
        <v-flex>
          <v-select
           :items="years"
           label="Choose your year"
           v-model="year"
           ></v-select>
         </v-flex>
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn blue">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Signup',
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      year: null,
      feedback: null,
      years: ['1st Year', '2nd Year']
    }
  },
  methods: {
    signup() {
      const ref = firebase.firestore().collection('users')
      if(this.password == this.confirmPassword) {
        if(this.name && this.email && this.password){
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            ref.doc(cred.user.email).set({
                  name: this.name,
                  email: this.email,
                  year: this.year,
                  has_assigned_group: false,
                  status_active: true,
                  met_buddy: false,
                  uploadedPhoto: false,
                  hometown: 'Fun Town, USA',
                  preindustry: 'Something old',
                  postindustry: 'Something new',
                  about: 'I love WAAAM!',
                  buddy_email: null,
                  is_admin: false,
                  past_buddies: ['n/a']
                })
              }).then(() => {
                firebase.auth().currentUser.sendEmailVerification()
              }).then(() => {this.$router.push({ name: 'VerifyEmail' })})
              .catch(err => {
                console.log(err)
                this.feedback = err.message})
            }
         else {
          this.feedback = 'Please complete all fields.'
        }
      } else {
        this.feedback = 'Passwords do not match.'
      }
    }
  }
}
</script>

<style lang="css">
.signup {
  margin-top: 40px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.signup h2{
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px
}
.label {
  font-size: 1em;
}
</style>

<template>
  <v-toolbar app flat dark class="blue darken-3">
    <v-toolbar-title class="white--text">
        WAAAM Lunches
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-xs-only">
      <v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn flat v-if="user" @click="logout">
          <v-icon left>exit_to_app</v-icon>
          Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from '@/firebase/init'
export default {
  data() {
    return {
      user: null
    }
  },
  computed: {
    menuItems () {
      var self = this
      if(this.user) {
        firebase.firestore().collection('users').doc(self.user.email).get()
        .then(doc => {
          var is_admin = doc.data().is_admin
          if(is_admin) {
            return [
              { title: 'About', path: '/about', icon: 'find_in_page' },
              { title: 'Admin', path: '/admin', icon: 'person' },
              { title: 'Current Pairing', path:'/currentpairing', icon:'group' },
              { title: 'Edit Profile', path: '/editprofile', icon: 'person' }
          ]
        }
         else {
            return [
              { title: 'About', path: '/about', icon: 'find_in_page' },
              { title: 'Current Pairing', path:'/currentpairing', icon:'group' },
              { title: 'Edit Profile', path: '/editprofile', icon: 'person' }
            ]
          }
        })
      } else {
          return [
            { title: 'About', path: '/about', icon: 'find_in_page' },
            { title: 'Signup', path: '/signup', icon: 'face' },
            { title: 'Login', path: '/login', icon: 'lock_open' }
          ]
        }
      }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  },
  created() {
    var self = this
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.user = user
        console.log(self.user)
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style lang="css">
.margin-right {
  margin-right: 100px;
}
.margin-left {
  margin-left: 100px;
}
</style>

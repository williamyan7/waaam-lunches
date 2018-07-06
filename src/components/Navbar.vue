<template>
  <v-toolbar app flat dark class="blue darken-3">
    <v-toolbar-title class="white--text">
      <router-link to="/" tag="span" style="cursor: pointer">
        WAAAM Lunches
      </router-link>
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
      if(this.user) {
        return [
          { title: 'Home', path:'/home', icon:'home' },
          { title: 'Profile', path: '/profile', icon: 'perm_identity' }
        ]
      } else {
          return [
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
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.user = user
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

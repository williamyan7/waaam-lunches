<template>
  <div>
    <v-navigation-drawer app v-model="sideNav"
    style ="position:fixed; top:0;left:0;overflow-y:scroll;" absolute temporary>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user" @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app flat dark class="blue darken-3">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"
      class = "hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
          <router-link v-if="!user" :to="{name: 'LandingPage'}">WAAAM Lunches</router-link>
          <router-link v-if="user" :to="{name: 'EditProfile'}">WAAAM Lunches</router-link>
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
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      user: null,
      is_admin: null,
      admin_emails: ['williamyan7@gmail.com', 'willyan@wharton.upenn.edu'],
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      var self = this
      if(this.user) {
        if(self.admin_emails.indexOf(this.user.email) > -1) {
          return [
            { title: 'About', path: '/about', icon: 'find_in_page' },
            { title: 'Admin', path: '/admin', icon: 'person' },
            { title: 'Current Pairing', path:'/currentpairing', icon:'group' },
            { title: 'Edit Profile', path: '/editprofile', icon: 'person' }
          ]
        } else {
            return [
              { title: 'About', path: '/about', icon: 'find_in_page' },
              { title: 'Current Pairing', path:'/currentpairing', icon:'group' },
              { title: 'Edit Profile', path: '/editprofile', icon: 'person' }
            ]
          }
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

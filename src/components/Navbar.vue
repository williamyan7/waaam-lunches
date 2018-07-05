<template lang="html">
  <div class="navbar">
    <nav class="blue darken-3">
      <div class="container">
        <router-link :to="{name: 'LandingPage'}" class="brand-logo left">WAAAM Lunches</router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{name: 'Signup'}">Signup</router-link></li>
          <li v-if="!user"><router-link :to="{name: 'Login'}">Login</router-link></li>
          <li v-if="user"><a>{{ user.email }}</a></li>
          <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  }
}
</script>

<style lang="css">
</style>

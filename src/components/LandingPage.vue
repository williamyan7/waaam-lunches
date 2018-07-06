<template>
  <v-container fluid>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h2>Welcome to WAAAM Lunches</h2>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <p class="blockquote text-xs-center">
        This is a tool to help WAAAMers find new friends for lunch. <br>
        Please sign up with an account to begin.
      </p>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-3>
      <v-btn color="primary" to="/signup">Sign Up</v-btn>
      <v-btn to="/login">Login</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'LandingPage',
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>

<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view />
    </v-content>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
export default {
  name: 'App',
  components: {
    Navbar,
    Home
  }
}
</script>

<style>
</style>

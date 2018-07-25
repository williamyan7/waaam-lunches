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
import styles from '@/assets/styles.css'
export default {
  name: 'App',
  components: {
    Navbar,
    styles
  }
}
</script>

<style>
</style>

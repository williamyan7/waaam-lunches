<template lang="html">
  <div class="profile container card-panel">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h3>Here's your buddy!</h3>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-5>
        <img v-if="!hasImage" src="../assets/profile_placeholder.png" class="profilePicture">
        <img v-if="hasImage" :src="imageURL" class="profilePicture">
      </v-flex>
      <div class="infoSection container card-panel">
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{{ buddy_name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ buddy_email }}</td>
              <td></td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{{ buddy_year }}</td>
              <td></td>
            </tr>
            <tr>
              <td>Hometown</td>
              <td>{{ buddy_hometown }}</td>
            </tr>
            <tr>
              <td>Pre-Wharton Industry</td>
              <td>{{ buddy_preIndustry }}</td>
            </tr>
            <tr>
              <td>Post-Wharton Industry Interest(s)</td>
              <td>{{ buddy_postIndustry }}</td>
            </tr>
            <tr>
              <td>Hobbies and Interests</td>
              <td>{{ buddy_about }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buddy_name: null,
      buddy_year: null,
      buddy_email: null,
      buddy_hometown: null,
      buddy_preIndustry: null,
      buddy_postIndustry: null,
      buddy_about: null
    }
  },
  created() {
    var self = this
    buddy_email = firebase.auth().currentUser.buddy_email
    firebase.firestore().collections('users').get(buddy_email)
    .then(doc => {
      var data = doc.data()
      self.buddy_name = data.name
      self.buddy_year = data.year
      self.buddy_hometown = data.hometown
      self.buddy_about = data.about
      self.buddy_preIndustry = data.preindustry
      self.buddy_postIndustry = data
    })
  }
}
</script>

<style lang="css">
</style>

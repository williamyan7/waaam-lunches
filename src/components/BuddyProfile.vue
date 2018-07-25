<template lang="html">
  <div class="profile card-panel">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h4>Here's your buddy!</h4>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <img v-if="!hasImage" src="../assets/profile_placeholder.png" class="profilePicture">
        <img v-if="hasImage" :src="imageURL" class="profilePicture">
      </v-flex>
      <div class="infoSection container no-padding">
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
import firebase from 'firebase'
export default {
  data() {
    return {
      buddy_name: null,
      buddy_year: null,
      buddy_email: null,
      buddy_hometown: null,
      buddy_preIndustry: null,
      buddy_postIndustry: null,
      buddy_about: null,
      hasImage: false,
      imageURL: null,
      hasImage: false
    }
  },
  created() {
    var self = this
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.email).get()
    .then(doc => {
      self.buddy_email = doc.data().buddy_email
      firebase.firestore().collection('users').doc(self.buddy_email).get()
      .then(doc => {
        var data = doc.data()
        self.hasImage = data.uploadedPhoto
        self.buddy_name = data.name
        self.buddy_year = data.year
        self.buddy_hometown = data.hometown
        self.buddy_about = data.about
        self.buddy_preIndustry = data.preindustry
        self.buddy_postIndustry = data.postindustry
        if(self.hasImage){
          firebase.storage().ref().child(self.buddy_email)
          .getDownloadURL().then(function(url) {
            self.imageURL = url
          })
        }
      })
    })

  }
}
</script>

<style lang="css">
.profilePicture {
  height: 150px;
}
.infoSection {
  margin-top: 30px;
  max-width: 500px;
}
.profile {
  margin-top: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.custom-file-upload{
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.deleteButton {
  margin-top: 10px;
}
.infoSection {
  margin-top: 30px;
  max-width: 500px;
}
input[type="file"] {
  display: none;
}
.settings {
  margin-left: 40px;
  margin-top: 20px;
}
</style>

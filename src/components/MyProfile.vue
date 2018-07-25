<template lang="html">
  <div class="profile card-panel">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h4>Here's you!</h4>
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
              <td>{{ name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ email }}</td>
              <td></td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{{ year }}</td>
              <td></td>
            </tr>
            <tr>
              <td>Hometown</td>
              <td>{{ hometown }}</td>
            </tr>
            <tr>
              <td>Pre-Wharton Industry</td>
              <td>{{ preIndustry }}</td>
            </tr>
            <tr>
              <td>Post-Wharton Industry Interest(s)</td>
              <td>{{ postIndustry }}</td>
            </tr>
            <tr>
              <td>Hobbies and Interests</td>
              <td>{{ about }}</td>
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
      hasImage: true,
      imageURL: '',
      email: '',
      name: '',
      about: '',
      hometown: '',
      year:'',
      preIndustry:'',
      postIndustry:'',
    }
  },
  created() {
    var self = this
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.email).get()
    .then(doc => {
      var data = doc.data()
      self.email = data.email
      self.hasImage = data.uploadedPhoto
      self.name = data.name
      self.year = data.year
      self.hometown = data.hometown
      self.about = data.about
      self.preIndustry = data.preindustry
      self.postIndustry = data.postindustry
      if(self.hasImage){
        firebase.storage().ref().child(self.email)
        .getDownloadURL().then(function(url) {
          self.imageURL = url
        })
      }
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

<template lang="html">
  <!-- Current user profile -->
  <div class="profile container card-panel">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h4>Welcome to your profile</h4>
        <h6>Make sure all your information below is completed!</h6>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-5>
        <img v-if="!hasImage" src="../assets/profile_placeholder.png" class="profilePicture">
        <img v-if="hasImage" :src="imageURL" class="profilePicture">
        <form enctype="multipart/form-data">
          <label for="uploadedImage" class="custom-file-upload grey-text text-darken-2">Upload Photo
          <input class="photoInput" type="file" value="upload" id="uploadedImage" accept="image/*" @change="uploadImage">
          </label>
          <button @click="removeImage"><i class="material-icons grey-text text-darken-2 deleteButton">delete</i></button>
        </form>
      </v-flex>
      <div class="settings no-padding">
        <table>
          <tbody>
            <tr>
              <td>
                Continue being assigned weekly lunch buddies?
              </td>
              <td style="width:25%">
                <div class="switch">
                  <label>
                    No
                    <input type="checkbox" @click="toggleStatus" v-model="status_active">
                    <span class="lever"></span>
                    Yes
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                Have you met with your current lunch buddy?
              </td>
              <td>
                <div class="switch">
                  <label>
                    No
                    <input type="checkbox" @click="toggleMetBuddy" v-model="met_buddy">
                    <span class="lever"></span>
                    Yes
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="infoSection container no-padding">
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td v-if="!editableName">{{ name }}</td>
              <td v-if="editableName"><input type="text" name="name" v-model="name"></td>
              <td v-if="!editableName"><button @click="editName"><i class="material-icons grey-text">edit</i></button></td>
              <td v-if="editableName"><button @click="submitName"><i class="material-icons grey-text">edit</i></button></td>
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
              <td>Buddy email</td>
              <td>{{ buddy_email }}</td>
              <td></td>
            </tr>
            <tr>
              <td>Hometown</td>
              <td v-if="!editableHometown">{{ hometown }}</td>
              <td v-if="editableHometown"><input type="text" name="hometown" v-model="hometown"></td>
              <td v-if="!editableHometown"><button @click="editHometown"><i class="material-icons grey-text">edit</i></button></td>
              <td v-if="editableHometown"><button @click="submitHometown"><i class="material-icons grey-text">edit</i></button></td>
            </tr>
            <tr>
              <td>Pre-Wharton Industry</td>
              <td v-if="!editablePre">{{ preIndustry }}</td>
              <td v-if="editablePre"><input type="text" name="preIndustry" v-model="preIndustry"></td>
              <td v-if="!editablePre"><button @click="editPre"><i class="material-icons grey-text">edit</i></button></td>
              <td v-if="editablePre"><button @click="submitPre"><i class="material-icons grey-text">edit</i></button></td>
            </tr>
            <tr>
              <td>Post-Wharton Industry Interest(s)</td>
              <td v-if="!editablePost">{{ postIndustry }}</td>
              <td v-if="editablePost"><input type="text" name="postIndustry" v-model="postIndustry"></td>
              <td v-if="!editablePost"><button @click="editPost"><i class="material-icons grey-text">edit</i></button></td>
              <td v-if="editablePost"><button @click="submitPost"><i class="material-icons grey-text">edit</i></button></td>
            </tr>
            <tr>
              <td>Hobbies and Interests</td>
              <td v-if="!editableAbout">{{ about }}</td>
              <td v-if="editableAbout"><input type="text" name="about" v-model="about"></td>
              <td v-if="!editableAbout"><button @click="editAbout"><i class="material-icons grey-text">edit</i></button></td>
              <td v-if="editableAbout"><button @click="submitAbout"><i class="material-icons grey-text">edit</i></button></td>
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
      buddy_email:'',
      editableName: false,
      editableAbout: false,
      editableHometown: false,
      editablePre: false,
      editablePost: false,
      status_active: null,
      met_buddy: null
    }
  },
  created() {
    var self = this
    //Check to see if user has an uploaded photo
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
    .get().then(doc => {
      var data = doc.data()
      self.hasImage = data.uploadedPhoto
      self.name = data.name
      self.email = data.email
      self.about = data.about
      self.hometown = data.hometown
      self.year = data.year
      self.preIndustry = data.preindustry
      self.postIndustry = data.postindustry
      self.status_active = data.status_active
      self.met_buddy = data.met_buddy
      self.buddy_email = data.buddy_email
      if(self.hasImage){
        firebase.storage().ref().child(firebase.auth().currentUser.email)
        .getDownloadURL().then(function(url) {
          self.imageURL = url
        })
      }
    })
  },
  methods: {
    uploadImage(event) {
      var file = event.target.files
      var self = this
      //Upload image
      firebase.storage().ref().child(firebase.auth().currentUser.email).put(file[0])
      .then(() => {
        //Get image URL
        firebase.storage().ref().child(firebase.auth().currentUser.email)
        .getDownloadURL().then(function(url) {
        self.imageURL = url
        self.hasImage = true
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
        .update({
          uploadedPhoto: true
        })
        }).catch(err => console.log(err))
      })
    },
    removeImage() {
      this.hasImage = false
      firebase.storage().ref().child(firebase.auth().currentUser.email).delete()
      .then(() => console.log('delete successful')).catch(err => console.log(err))
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
      .update({
        uploadedPhoto: false
      })
    },
    editName() {
      this.editableName = true
    },
    submitName() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
      .update({ name: this.name })
      this.editableName = false
    },
    editAbout() {
      this.editableAbout = true
    },
    submitAbout() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
      .update({ about: this.about })
      this.editableAbout = false
    },
    editHometown() {
      this.editableHometown = true
    },
    submitHometown() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
      .update({ hometown: this.hometown })
      this.editableHometown = false
    },
    editPre() {
      this.editablePre = true
    },
    submitPre() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
      .update({ preindustry: this.preIndustry })
      this.editablePre = false
    },
    editPost() {
      this.editablePost = true
    },
    submitPost() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
      .update({ postindustry: this.postIndustry })
      this.editablePost = false
    },
    toggleStatus() {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
      .update({ status_active: !this.status_active })
    },
    toggleMetBuddy() {
      var self = this
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.email)
      .update({ met_buddy: !this.met_buddy })
      .then(() => {
        firebase.firestore().collection('users').doc(self.buddy_email)
        .update({ met_buddy: self.met_buddy })
      })
    }
  }
}
</script>

<style lang="css">
.profile {
  margin-top: 40px;
  max-width: 600px;
}
.profilePicture {
  height: 150px;
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

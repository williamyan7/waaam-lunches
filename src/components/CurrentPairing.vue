<template lang="html">
  <div class="row">
    <div class="col s1" />
    <div class="profile col s5">
      <MyProfile />
    </div>
    <div class="profile col s5">
      <BuddyProfile />
    </div>
    <div class="col s1" />
  </div>
</template>

<script>
import MyProfile from '@/components/MyProfile'
import BuddyProfile from '@/components/BuddyProfile'
export default {
  data () {
    return {

    }
  },
  components: {
    MyProfile,
    BuddyProfile
  }
}
</script>

<style lang="css">
.profile {
  min-width: 350px;
}
</style>

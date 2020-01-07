<template>
  <div />
</template>
<script>
export default {
  name: 'LogoutPage',
  mounted () {
    this.$firebase.auth().signOut().then(() => {
      this.$router.replace('/')
    })
  }
}
</script>
<style scoped>
</style>

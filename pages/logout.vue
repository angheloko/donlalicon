<template>
  <div />
</template>
<script>
export default {
  name: 'LogoutPage',
  mounted () {
    return this.$firebase.auth().signOut().then(() => {
      this.$router.replace('/')
      return null
    })
  }
}
</script>
<style scoped>
</style>

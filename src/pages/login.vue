<template>
  <div class="w-full max-w-xs mx-auto">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent
    >
      <div class="mb-4">
        <label for="email">
          Email
        </label>
        <input
          id="email"
          v-model="email"
          type="text"
          placeholder="Email"
        >
      </div>
      <div class="mb-6">
        <label for="password">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
        >
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          @click="submitForm"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  middleware: 'anonymous-access',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['auth'])
  },
  watch: {
    auth (value) {
      if (value) {
        this.$router.push({
          path: '/admin'
        })
      }
    }
  },
  methods: {
    submitForm () {
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.message)
        })
    }
  }
}
</script>

<style scoped>
</style>

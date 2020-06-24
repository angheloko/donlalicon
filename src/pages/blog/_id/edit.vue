<template>
  <blog-form v-if="isLoaded" v-model="blog" />
</template>
<script>
import BlogForm from '~/components/BlogForm'
export default {
  name: 'BlogEditPage',
  middleware: 'authenticated-access',
  layout: 'admin',
  components: { BlogForm },
  data () {
    return {
      blog: {},
      id: '',
      isLoaded: false
    }
  },
  validate ({ params }) {
    return params.id !== undefined
  },
  async mounted () {
    const db = this.$firebase.firestore()

    try {
      const documentSnapshot = await db.collection('blogs')
        .doc(this.$route.params.id)
        .get()

      if (!documentSnapshot.exists) {
        this.$nuxt.error({ statusCode: 404, message: 'Blog not found' })
        return
      }

      this.blog = {
        id: documentSnapshot.id,
        ...documentSnapshot.data()
      }

      this.isLoaded = true
    } catch (e) {
      this.$nuxt.error({ statusCode: 404, message: 'Blog not found' })
    }
  }
}
</script>
<style scoped>
</style>

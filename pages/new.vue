<template>
  <blog-form v-model="blog" />
</template>

<script>
import BlogForm from '~/components/BlogForm'

export default {
  name: 'BlogCreatePage',
  middleware: 'authenticated-access',
  components: { BlogForm },
  data () {
    return {
      blog: {}
    }
  }
}
</script>

<style scoped>
</style>

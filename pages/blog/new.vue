<template>
  <div>
    <blog-form v-model="blog" />
    <pre>{{ blog }}</pre>
  </div>
</template>

<script>
import BlogForm from '~/components/BlogForm'

export default {
  name: 'NewPage',
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

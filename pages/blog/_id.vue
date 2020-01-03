<template>
  <article class="blog">
    <div class="mb-5">
      <div class="text-xs uppercase font-semibold text-gray-600 mb-1 flex">
        <div v-for="tag of blog.tags" :key="tag" class="mx-2 first:ml-0">
          {{ tag }}
        </div>
      </div>
      <h1>{{ blog.title }}</h1>
      <h2 v-if="blog.lead" class="font-sans text-gray-600 font-light">
        {{ blog.lead }}
      </h2>
      <div class="text-gray-600 text-xs font-light">
        {{ blog.created | toDate }}
      </div>
    </div>
    <figure v-if="blog.imageUrl" class="mb-5">
      <img :src="blog.imageUrl" :alt="blog.imageAlt || blog.title" class="w-full">
      <figcaption v-if="blog.imageCaption" v-html="blog.imageCaption" class="text-center text-gray-600 text-sm my-2" />
    </figure>
    <div v-html="blog.body" class="content" />
  </article>
</template>

<script>
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

export default {
  name: 'BlogPage',
  data () {
    return {
      blog: null
    }
  },
  head () {
    const url = `https://donlalicon.dev/blog/${this.blog.id}`

    const head = {
      title: this.blog.title,
      link: [
        {
          rel: 'canonical',
          href: url
        }
      ],
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: url
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: `${this.blog.title} - Don Lalicon - Codesman`
        }
      ]
    }

    if (this.blog.description) {
      head.meta.push({
        hid: 'description',
        name: 'description',
        content: this.blog.description
      }, {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: this.blog.description
      })
    }

    if (this.blog.imageUrl) {
      head.meta.push({
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: this.blog.imageUrl
      })
    }

    return head
  },
  validate ({ params }) {
    // Must be a number
    return params.id !== undefined
  },
  async asyncData ({ app, params, error }) {
    const db = app.$firebase.firestore()

    try {
      const documentSnapshot = await db.collection('blogs').doc(params.id).get()

      if (!documentSnapshot.exists) {
        error({ statusCode: 404, message: 'Blog not found' })
        return
      }

      return {
        blog: {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        }
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Blog not found' })
    }
  },
  mounted () {
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('css', css)

    this.$el.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

<style scoped>
</style>

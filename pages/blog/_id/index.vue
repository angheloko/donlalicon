<template>
  <blog-details :blog="blog" :prev="prev" :next="next" />
</template>
<script>
import BlogDetails from '~/components/BlogDetails'

export default {
  name: 'BlogPage',
  components: { BlogDetails },
  data () {
    return {
      blog: null,
      prev: null,
      next: null
    }
  },
  head () {
    const url = `https://donlalicon.dev/blog/${this.blog.id}`

    const dateCreated = new Date(this.blog.created.seconds * 1000)
    const dateChanged = new Date(this.blog.changed.seconds * 1000)

    const structuredData = {
      '@type': 'Article',
      datePublished: dateCreated.toISOString(),
      dateModified: dateChanged.toISOString(),
      headline: this.blog.title,
      image: this.blog.imageUrl
    }

    const head = {
      title: this.blog.title,
      link: [
        {
          rel: 'canonical',
          href: url
        }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData)
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
          content: `${this.blog.title} - Don Lalicon - Codesmith`
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

      const promise1 = db
        .collection('blogs')
        .where('published', '==', true)
        .orderBy('created', 'desc')
        .limit(1)
        .startAfter(documentSnapshot)
        .get()

      const promise2 = db
        .collection('blogs')
        .where('published', '==', true)
        .orderBy('created', 'asc')
        .limit(1)
        .startAfter(documentSnapshot)
        .get()

      const prevNext = await Promise.all([promise1, promise2])
        .then((querySnapshots) => {
          const docs = []
          for (const querySnapshot of querySnapshots) {
            if (querySnapshot.empty) {
              docs.push(null)
            } else {
              const doc = querySnapshot.docs[0]
              docs.push({
                id: doc.id,
                title: doc.get('title')
              })
            }
          }
          return docs
        })

      return {
        blog: {
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        },
        prev: prevNext[0],
        next: prevNext[1]
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      error({ statusCode: 404, message: 'Blog not found' })
    }
  }
}
</script>
<style scoped>
</style>

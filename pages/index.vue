<template>
  <div class="container">
    <teaser v-for="teaser of teasers" :key="teaser.id" :teaser="teaser" class="mb-10" />
    <loading-spinner v-if="isLoading" />
  </div>
</template>

<script>
import Teaser from '~/components/Teaser'
import LoadingSpinner from '~/components/LoadingSpinner'

export default {
  components: {
    LoadingSpinner,
    Teaser
  },
  data () {
    return {
      teasers: [],
      eof: false,
      isLoading: false,
      lastDoc: null,
      batchSize: 10
    }
  },
  async mounted () {
    await this.loadBlogs()
    window.addEventListener('scroll', this.loadMore)
  },
  methods: {
    async loadBlogs () {
      if (this.isLoading || this.eof) {
        return
      }

      this.isLoading = true
      const db = this.$firebase.firestore()

      let query = db.collection('teasers')
        .where('published', '==', true)
        .orderBy('created', 'desc')
        .limit(this.batchSize)

      if (this.lastDoc) {
        query = query.startAfter(this.lastDoc)
      }

      const querySnapshot = await query.get()

      this.eof = querySnapshot.empty

      if (querySnapshot.size > 0) {
        this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

        for (const doc of querySnapshot.docs) {
          this.teasers.push({
            id: doc.id,
            ...doc.data()
          })
        }
      }

      this.isLoading = false
    },
    loadMore () {
      const elementBounds = this.$el.getBoundingClientRect()

      // Add extra padding to load earlier even before the bottom of the element is in view.
      const padding = 100

      const bottomOfWindow =
        elementBounds.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) + padding

      if (bottomOfWindow && !this.isLoading && !this.eof) {
        this.loadBlogs()
      }
    }
  }
}
</script>

<style>
</style>

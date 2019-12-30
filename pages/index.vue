<template>
  <div>
    <teaser v-for="teaser of teasers" :key="teaser.id" :teaser="teaser" class="mb-10" />
  </div>
</template>

<script>
import Teaser from '~/components/Teaser'

export default {
  components: {
    Teaser
  },
  data () {
    return {
      teasers: []
    }
  },
  async asyncData ({ app }) {
    const teasers = []
    const db = app.$firebase.firestore()

    const querySnapshot = await db.collection('teasers')
      .where('published', '==', true)
      .orderBy('created', 'desc')
      .get()

    if (querySnapshot.size > 0) {
      for (const doc of querySnapshot.docs) {
        teasers.push({
          id: doc.id,
          ...doc.data()
        })
      }
    }

    return { teasers }
  }
}
</script>

<style>
</style>

<template>
  <article class="flex">
    <div class="flex-grow mr-2">
      <div class="text-xs text-gray-600 font-light uppercase font-semibold mb-1 flex flex-wrap">
        <div v-for="tag of tags" :key="tag" class="mx-2 first:ml-0">
          {{ tag }}
        </div>
      </div>
      <nuxt-link
        :to="{ name: 'blog-id', params: { id: teaser.id } }"
        class="text-gray-800 no-underline hover:text-gray-800"
      >
        <h2 class="mb-2">
          {{ teaser.title }}
        </h2>
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'blog-id', params: { id: teaser.id } }"
        class="text-gray-700 no-underline hover:text-gray-700"
      >
        <div class="mb-2 text-lg" v-html="teaser.body" />
      </nuxt-link>
      <div class="text-xs text-gray-600 font-light">
        {{ teaser.created | toDate }}
      </div>
    </div>
    <div v-if="teaser.imageUrl" class="flex-shrink-0">
      <nuxt-link :to="{ name: 'blog-id', params: { id: teaser.id } }" class="no-underline">
        <img :src="teaser.imageUrl" :alt="teaser.imageAlt || teaser.title" class="w-24 md:w-32 h-auto object-cover">
      </nuxt-link>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Teaser',
  props: {
    teaser: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags () {
      return this.teaser.tags.slice(0).sort()
    }
  }
}
</script>

<style scoped>
</style>

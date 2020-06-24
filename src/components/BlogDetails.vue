<template>
  <article class="blog">
    <div class="mb-5">
      <div class="text-xs uppercase font-semibold text-gray-600 mb-1 flex flex-wrap">
        <div v-for="tag of tags" :key="tag" class="mx-2 first:ml-0">
          {{ tag }}
        </div>
      </div>
      <h1>{{ blog.title }}</h1>
      <h2 v-if="blog.lead" class="font-sans text-gray-700 font-light">
        {{ blog.lead }}
      </h2>
      <div class="text-gray-600 text-xs font-light">
        {{ blog.created | toDate }}
      </div>
    </div>
    <figure v-if="blog.imageUrl" class="mb-5">
      <!--suppress HtmlUnknownTarget -->
      <img :src="blog.imageUrl" :alt="blog.imageAlt || blog.title" class="w-full">
      <figcaption v-if="blog.imageCaption" class="text-center text-gray-600 text-sm my-2" v-html="blog.imageCaption" />
    </figure>
    <div class="content" v-html="blog.body" />
    <div class="flex border rounded shadow p-5 text-gray-600 md:w-2/3 mx-auto my-10 items-center">
      <img src="/avatar.jpg" alt="Author" class="h-20 w-20 object-cover rounded-full flex-shrink-0 mr-5">
      <div>
        Hey there! I hope you find this post useful. If you have anything to say about this post,
        questions or feedback, send me a <a href="https://twitter.com/DonOrDoNot" target="_blank">tweet</a>
        or an <a href="mailto:dalalicon@gmail.com" target="_blank">email</a>.
      </div>
    </div>
    <div class="clearfix mt-10 text-xs font-semibold uppercase">
      <nuxt-link
        v-if="prev"
        :to="{ name: 'blog-id', params: { id: prev.id } }"
        class="float-left no-underline w-1/2 break-normal pr-5"
      >
        &lt; {{ prev.title }}
      </nuxt-link>
      <nuxt-link
        v-if="next"
        :to="{ name: 'blog-id', params: { id: next.id } }"
        class="float-right no-underline w-1/2 break-normal pl-5"
      >
        {{ next.title }} &gt;
      </nuxt-link>
    </div>
  </article>
</template>

<script>
import hljs from 'highlight.js/lib/highlight'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import php from 'highlight.js/lib/languages/php'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

export default {
  name: 'BlogDetails',
  props: {
    blog: {
      type: Object,
      required: true
    },
    prev: {
      type: Object,
      default: null
    },
    next: {
      type: Object,
      default: null
    }
  },
  computed: {
    tags () {
      return this.blog.tags.slice(0).sort()
    }
  },
  mounted () {
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('css', css)
    hljs.registerLanguage('xml', xml)
    hljs.registerLanguage('php', php)
    hljs.registerLanguage('yaml', yaml)
    hljs.registerLanguage('sql', sql)
    hljs.registerLanguage('bash', bash)
    hljs.registerLanguage('shell', shell)

    this.$el.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
<style scoped>
</style>

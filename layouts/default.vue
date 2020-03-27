<template>
  <div class="flex flex-col leading-normal text-gray-800 min-h-screen lg:w-2/4 md:mx-auto md:w-full">
    <header class="h-16 sm:flex sm:items-center sm:justify-between mx-5 mb-10">
      <nuxt-link to="/" class="text-gray-800 no-underline hover:text-gray-800 flex items-center">
        <h4 class="text-xl font-mono">
          // donlalicon.dev
        </h4>
      </nuxt-link>
      <client-only>
        <ais-instant-search
          v-click-outside="closeAutocomplete"
          :search-client="searchClient"
          index-name="blogs"
        >
          <ais-autocomplete>
            <div slot-scope="{ indices, refine }" class="relative">
              <div>
                <input
                  v-model="keywords"
                  type="search"
                  placeholder="Search"
                  class="border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal"
                  @input="refine($event.currentTarget.value)"
                >
                <div
                  v-if="keywords && !hideAutocomplete"
                  class="absolute left-0 mt-2 py-2 w-full z-50 bg-white rounded-lg shadow-xl"
                >
                  <a
                    v-for="hit in indices[0].hits"
                    :key="hit.objectID"
                    class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-gray-800 cursor-pointer"
                    @click="goToBlog(hit.objectID)"
                  >
                    <ais-highlight attribute="title" :hit="hit" />
                  </a>
                  <ais-powered-by class="px-4 py-2" />
                </div>
              </div>
              <div class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
                <svg class="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
              </div>
            </div>
          </ais-autocomplete>
        </ais-instant-search>
      </client-only>
    </header>
    <main class="flex-grow m-5 mb-10">
      <nuxt />
    </main>
    <footer class="m-5 text-xs flex justify-between items-center">
      <div>
        © Don Lalicon 2019 - 2020
      </div>
      <div class="flex">
        <a href="https://twitter.com/DonHasTweets" target="_blank">
          <svg class="h-6 w-6 mr-2 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm3.905 7.864c.004.082.005.164.005.244 0 2.5-1.901 5.381-5.379 5.381a5.335 5.335 0 0 1-2.898-.85c.147.018.298.025.451.025.886 0 1.701-.301 2.348-.809a1.895 1.895 0 0 1-1.766-1.312 1.9 1.9 0 0 0 .853-.033 1.892 1.892 0 0 1-1.517-1.854v-.023c.255.141.547.227.857.237a1.89 1.89 0 0 1-.585-2.526 5.376 5.376 0 0 0 3.897 1.977 1.891 1.891 0 0 1 3.222-1.725 3.797 3.797 0 0 0 1.2-.459 1.9 1.9 0 0 1-.831 1.047 3.799 3.799 0 0 0 1.086-.299 3.834 3.834 0 0 1-.943.979z" />
          </svg>
        </a>
        <a href="https://github.com/angheloko" target="_blank">
          <svg class="h-6 w-6 mr-2 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.015 9.949h-.03c-1.191 0-2.24-.303-2.861.268a1.57 1.57 0 0 0-.527 1.197c0 1.852 1.483 2.08 3.389 2.08h.029c1.905 0 3.389-.229 3.389-2.08 0-.443-.156-.856-.527-1.197-.622-.571-1.671-.268-2.862-.268zM8.393 12.48c-.363 0-.656-.408-.656-.91s.293-.908.656-.908c.363 0 .657.406.657.908.001.502-.293.91-.657.91zm3.213 0c-.363 0-.657-.408-.657-.91s.294-.908.657-.908c.362 0 .656.406.656.908.001.502-.293.91-.656.91zM10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm.876 13.539c-.172 0-.514 0-.876.002-.362-.002-.704-.002-.876-.002-.76 0-3.772-.059-3.772-3.689 0-.834.286-1.445.755-1.955-.074-.184-.078-1.232.32-2.236 0 0 .916.1 2.301 1.051.289-.081.781-.122 1.272-.122s.982.041 1.273.121c1.385-.951 2.301-1.051 2.301-1.051.398 1.004.395 2.053.32 2.236.469.51.755 1.121.755 1.955-.001 3.632-3.013 3.69-3.773 3.69z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/dalalicon" target="_blank">
          <svg class="h-6 w-6 mr-2 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM7.65 13.979H5.706V7.723H7.65v6.256zm-.984-7.024c-.614 0-1.011-.435-1.011-.973 0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973zm8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355-.537 0-.856.371-.997.728-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01 1.279 0 2.238.857 2.238 2.699v3.699z" />
          </svg>
        </a>
        <a href="mailto:dalalicon@gmail.com" target="_blank">
          <svg class="h-6 w-6 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM6.231 7h7.52c.399 0 .193.512-.024.643-.217.13-3.22 1.947-3.333 2.014s-.257.1-.403.1a.793.793 0 0 1-.402-.1L6.255 7.643C6.038 7.512 5.833 7 6.231 7zM14 12.5c0 .21-.252.5-.444.5H6.444C6.252 13 6 12.71 6 12.5V8.853c0-.092-.002-.211.172-.11l3.417 2.015a.69.69 0 0 0 .402.1.69.69 0 0 0 .403-.1l3.434-2.014c.174-.102.172.018.172.11V12.5z" />
          </svg>
        </a>
      </div>
    </footer>
  </div>
</template>
<script>
import algoliasearch from 'algoliasearch/lite'

export default {
  data () {
    return {
      searchClient: algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_SEARCH_API_KEY),
      keywords: '',
      hideAutocomplete: false
    }
  },
  watch: {
    keywords (value) {
      if (value) {
        this.hideAutocomplete = false
      }
    }
  },
  methods: {
    goToBlog (blogId) {
      this.keywords = ''
      this.$router.push({
        name: 'blog-id',
        params: {
          id: blogId
        }
      })
    },
    closeAutocomplete () {
      this.hideAutocomplete = true
    }
  }
}
</script>

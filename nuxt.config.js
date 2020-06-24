module.exports = {
  srcDir: 'src',
  buildDir: 'functions/.nuxt',
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Don Lalicon - Codesmith',
    titleTemplate: '%s - Don Lalicon - Codesmith',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Personal blog of Don Lalicon.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#dd6b20' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/styles.css'
  ],
  purgeCSS: {
    whitelist: ['hljs'],
    whitelistPatterns: [/hljs-.+$/],
    whitelistPatternsChildren: [/hljs-.+$/]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase',
    '~/plugins/to-date',
    {
      src: '~/plugins/vue-instantsearch',
      mode: 'client'
    },
    {
      src: '~/plugins/click-outside',
      mode: 'client'
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

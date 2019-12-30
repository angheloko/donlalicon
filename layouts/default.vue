<template>
  <div class="flex flex-col leading-normal text-gray-800 min-h-screen">
    <header class="h-16 flex items-center px-5 max-w-4xl md:mx-auto md:w-full">
      <nuxt-link to="/" class="flex-grow text-gray-800 underline hover:text-gray-800 flex items-center">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M19.754 15.631L18 13V4c0-1.102-.9-2-2-2H4c-1.101 0-2 .898-2 2v9L.246 15.631C0 16 0 16.213 0 16.5v.5c0 .5.5 1 .999 1h18.002c.499 0 .999-.5.999-1v-.5c0-.287 0-.5-.246-.869zM7 16l.6-1h4.8l.6 1H7zm9-4H4V4h12v8z" />
        </svg>
        <h4 class="text-xl font-mono ml-2">
          donlalicon.dev
        </h4>
      </nuxt-link>
    </header>
    <main class="flex-grow m-5 mb-10 max-w-2xl md:mx-auto md:w-full">
      <nuxt />
    </main>
    <footer class="px-5 mb-5 text-xs max-w-4xl md:mx-auto md:w-full flex justify-between items-center">
      <div>
        © Don Lalicon 2019 - 2020 · Built using <a href="https://nuxtjs.org/">Nuxt.js</a> and
        <a href="https://tailwindcss.com/">Tailwind CSS</a>
      </div>
      <div class="flex">
        <a href="https://github.com/angheloko" target="_blank">
          <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.015 9.949h-.03c-1.191 0-2.24-.303-2.861.268a1.57 1.57 0 0 0-.527 1.197c0 1.852 1.483 2.08 3.389 2.08h.029c1.905 0 3.389-.229 3.389-2.08 0-.443-.156-.856-.527-1.197-.622-.571-1.671-.268-2.862-.268zM8.393 12.48c-.363 0-.656-.408-.656-.91s.293-.908.656-.908c.363 0 .657.406.657.908.001.502-.293.91-.657.91zm3.213 0c-.363 0-.657-.408-.657-.91s.294-.908.657-.908c.362 0 .656.406.656.908.001.502-.293.91-.656.91zM10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm.876 13.539c-.172 0-.514 0-.876.002-.362-.002-.704-.002-.876-.002-.76 0-3.772-.059-3.772-3.689 0-.834.286-1.445.755-1.955-.074-.184-.078-1.232.32-2.236 0 0 .916.1 2.301 1.051.289-.081.781-.122 1.272-.122s.982.041 1.273.121c1.385-.951 2.301-1.051 2.301-1.051.398 1.004.395 2.053.32 2.236.469.51.755 1.121.755 1.955-.001 3.632-3.013 3.69-3.773 3.69z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/dalalicon" target="_blank">
          <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM7.65 13.979H5.706V7.723H7.65v6.256zm-.984-7.024c-.614 0-1.011-.435-1.011-.973 0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973zm8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355-.537 0-.856.371-.997.728-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01 1.279 0 2.238.857 2.238 2.699v3.699z" />
          </svg>
        </a>
        <a href="mailto:dalalicon@gmail.com" target="_blank">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zM6.231 7h7.52c.399 0 .193.512-.024.643-.217.13-3.22 1.947-3.333 2.014s-.257.1-.403.1a.793.793 0 0 1-.402-.1L6.255 7.643C6.038 7.512 5.833 7 6.231 7zM14 12.5c0 .21-.252.5-.444.5H6.444C6.252 13 6 12.71 6 12.5V8.853c0-.092-.002-.211.172-.11l3.417 2.015a.69.69 0 0 0 .402.1.69.69 0 0 0 .403-.1l3.434-2.014c.174-.102.172.018.172.11V12.5z" />
          </svg>
        </a>
      </div>
    </footer>
  </div>
</template>

<style>
</style>

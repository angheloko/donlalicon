const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
const app = express()

const config = {
  dev: false
}

const nuxt = new Nuxt(config)
let isReady = false
const readyPromise = nuxt
  .ready()
  // eslint-disable-next-line promise/always-return
  .then(() => {
    isReady = true
  })
  .catch(() => {
    process.exit(1)
  })

async function handleRequest (req, res) {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  await nuxt.render(req, res)
}

app.use(handleRequest)
exports.nuxtssr = functions.https.onRequest(app)

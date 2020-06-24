const { createGzip } = require('zlib')
const { SitemapStream, streamToPromise } = require('sitemap')
const express = require('express')
const functions = require('firebase-functions')
const admin = require('firebase-admin')

const app = express()

async function handleRequest (req, res) {
  const db = admin.firestore()
  const smStream = new SitemapStream({ hostname: 'https://donlalicon.dev/' })
  const pipeline = smStream.pipe(createGzip())

  const querySnapshot = await db.collection('blogs')
    .where('published', '==', true)
    .orderBy('created', 'desc')
    .get()

  for (const doc of querySnapshot.docs) {
    const data = doc.data()
    smStream.write({
      url: `/blog/${doc.id}`,
      lastmod: data.changed.toDate().toISOString()
    })
  }
  smStream.end()

  const buffer = await streamToPromise(pipeline)

  res.writeHead(200, {
    'Content-Type': 'application/xml',
    'Content-Encoding': 'gzip'
  })
  res.end(buffer)
}

app.use(handleRequest)
exports.sitemap = functions.https.onRequest(app)

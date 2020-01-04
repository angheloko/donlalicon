const fs = require('fs')
require('dotenv').config()

const admin = require('firebase-admin')
const serviceAccount = require(process.env.SERVICE_ACCOUNT_KEY)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://donlalicon.firebaseio.com'
})

const db = admin.firestore()

const { SitemapStream, streamToPromise } = require('sitemap')
const sitemap = new SitemapStream({ hostname: 'https://donlalicon.dev' })

db.collection('blogs')
  .where('published', '==', true)
  .orderBy('created', 'desc')
  .get()
  .then((querySnapshot) => {
    for (const doc of querySnapshot.docs) {
      const data = doc.data()
      sitemap.write({
        url: `/blog/${doc.id}`,
        lastmod: data.changed
          .toDate()
          .toISOString()
          .substr(0, 10)
      })
    }

    sitemap.end()
    streamToPromise(sitemap).then((buffer) => {
      fs.writeFile(process.env.SITEMAP_PATH, buffer.toString(), (err) => {
        if (err) {
          throw err
        }

        // success case, the file was saved
        console.log(`Sitemap created at ${process.env.SITEMAP_PATH}`)
      })
    })
  })

const { createGzip } = require('zlib')
const { SitemapStream, streamToPromise } = require('sitemap')
const app = require('./firebase-admin')

export default function (req, res, next) {
  const db = app.firestore()
  const smStream = new SitemapStream({ hostname: 'https://donlalicon.dev/' })
  const pipeline = smStream.pipe(createGzip())

  db.collection('blogs')
    .where('published', '==', true)
    .orderBy('created', 'desc')
    .get()
    .then((querySnapshot) => {
      for (const doc of querySnapshot.docs) {
        const data = doc.data()
        smStream.write({
          url: `/blog/${doc.id}`,
          lastmod: data.changed
            .toDate()
            .toISOString()
        })
      }

      smStream.end()

      streamToPromise(pipeline).then((buffer) => {
        res.writeHead(200, {
          'Content-Type': 'application/xml',
          'Content-Encoding': 'gzip'
        })
        res.end(buffer)
      })
    })
}

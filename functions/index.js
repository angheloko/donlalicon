const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')
const stopword = require('stopword')

admin.initializeApp()

exports.indexBlog = functions.firestore.document('blogs/{blogId}')
  .onWrite((change, context) => {
    const document = change.after.exists ? change.after.data() : null
    const { blogId } = context.params

    const ALGOLIA_APP_ID = functions.config().algolia.app_id
    const ALGOLIA_API_KEY = functions.config().algolia.api_key
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex('blogs')

    function deleteObject() {
      return index
        .deleteObject(blogId)
        .then(() => {
          return true
        })
        .catch((error) => {
          console.error('Error deleting blog from index', error)
        })
    }

    function saveObject() {
      // The body property is stripped of HTMl tags and stop words.
      return index
        .saveObject({
          objectID: blogId,
          title: document.title,
          body: stopword.removeStopwords(document.body.replace(/(<([^>]+)>)/ig,"").split(' ')).join(' ').replace(/\s\s+/g, ' '),
          tags: document.tags,
          changed: document.changed.toMillis()
        })
        .then(() => {
          return true
        })
        .catch((error) => {
          console.error('Error indexing blog', error)
        })
    }

    if (!document) {
      return deleteObject(blogId)
    } else {
      if (!document.published) {
        return deleteObject(blogId)
      } else {
        return saveObject()
      }
    }
  })

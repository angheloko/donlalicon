import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/storage'

export default ({ env, store }, inject) => {
  const firebaseConfig = {
    apiKey: env.FB_API_KEY,
    authDomain: env.FB_AUTH_DOMAIN,
    databaseURL: env.FB_DB_URL,
    projectId: env.FB_PROJECT_ID,
    storageBucket: env.FB_STORAGE_BUCKET,
    messagingSenderId: env.FB_MESSAGING_SENDER_ID,
    appId: env.FB_APP_ID,
    measurementId: env.FB_MEASUREMENT_ID
  }

  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }

  if (process.client) {
    firebase.analytics()
    firebase.auth().onAuthStateChanged((user) => {
      store.dispatch('setAuth', user)
    })
  }

  inject('firebase', firebase)
}

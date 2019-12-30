import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'

export default ({ app, env }, inject) => {
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
    firebase.analytics()
  }

  inject('firebase', firebase)
}

import { initializeApp, getApps, cert, } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = require('./f427aba255.json')
const firebaseAdminConfig = {
  credential: cert(serviceAccount),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_URL
}

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig)
  }
}

customInitApp()

const db = getFirestore();

export { db }
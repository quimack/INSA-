import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCdovBKAWx7R4Bqjw2hD7oGM6HeSM2EN7k',
  projectId: 'insa-ae665',
  authDomain: 'insa-ae665.firebaseapp.com',
  messagingSenderId: "346572448959",
  appId: "1:346572448959:web:72c9115eedbc397059120a",
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)
// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAQ0kunCJ_gnU_nwum4MMzkEJED4A_9_Wc",
  authDomain: "sololivre-d4c3d.firebaseapp.com",
  projectId: "sololivre-d4c3d",
  storageBucket: "sololivre-d4c3d.firebasestorage.app",
  messagingSenderId: "549541598209",
  appId: "1:549541598209:web:c287398d86a5d2d50ddc00",
  measurementId: "G-J9QM1GF5DF"
}

const app = initializeApp(firebaseConfig);
console.log("Firebase App Initialized:", app);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { app, auth, provider, signInWithPopup, signOut, onAuthStateChanged }
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Usuário logado:', user);
    // Você pode redirecionar para outra página ou guardar informações do usuário
  } else {
    console.log('Usuário não autenticado');
  }
});

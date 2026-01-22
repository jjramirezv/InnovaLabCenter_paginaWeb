// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Base de datos
import { getAuth } from "firebase/auth"; // Login

// Tu configuración (Copiada de tu captura)
const firebaseConfig = {
  apiKey: "AIzaSyDST_o51NthUNAFdSaZekctLfIo34toNJ0",
  authDomain: "innovalab-center.firebaseapp.com",
  projectId: "innovalab-center",
  storageBucket: "innovalab-center.firebasestorage.app",
  messagingSenderId: "25193907638",
  appId: "1:25193907638:web:a7704abf1dae43bbf72d17",
  measurementId: "G-7HEXSZRKJM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios para usarlos en el resto de la app
export const db = getFirestore(app);
export const auth = getAuth(app);
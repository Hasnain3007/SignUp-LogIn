 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 
 const firebaseConfig = {
   apiKey: "AIzaSyD431Y9W6wrJodPUbYe0ic3HRMKPdRvr5s",
   authDomain: "practice-d1871.firebaseapp.com",
   projectId: "practice-d1871",
   storageBucket: "practice-d1871.appspot.com",
   messagingSenderId: "507221909663",
   appId: "1:507221909663:web:32fa98938a8d2978aa82aa"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 
 export{
  app,
  auth,
  createUserWithEmailAndPassword
 }
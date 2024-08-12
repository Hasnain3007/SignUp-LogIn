import { auth } from "./files/firebase.js";
import { signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";




let signIn = ()=>{
    var email = document.getElementById('email')
  var password = document.getElementById('password')
  
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log('login');

        Swal.fire({
      title: "Good job!",
      text: "Log In",
      icon: "success"
    })
    setTimeout(() => {
      window.location.href = 'dashboard.html'
    }, 1500);
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    
  });
}
var btn = document.getElementById('btn')

btn.addEventListener('click',signIn)

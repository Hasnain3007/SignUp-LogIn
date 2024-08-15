import { auth,createUserWithEmailAndPassword } from "./files/firebase.js";
// import { sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


// var flag = false

let signUp = ()=>{

  // sendEmailVerification(auth.currentUser)
  // .then(() => {
  //   // Email verification sent!
  //   // ...
  //   flag = true
  //   console.log('send');
    

  // });

    
    var email = document.getElementById('email')
    var password = document.getElementById('password')

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("signUp");
      Swal.fire({
        title: "Good job!",
        text: "Your Account Is Now Live!",
        icon: "success"
      })
      ;
      setTimeout(() => {
        window.location.href='login.html'
      }, 1500);
    })
    .catch((error) => {
      console.log(
        'error'
      );
      
      // ..
    });
    
  }
  
  var btn = document.getElementById('btn')
  
  btn.addEventListener('click',signUp)


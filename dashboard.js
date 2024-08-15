import {onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {collection, addDoc,getFirestore,getDocs   } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { app } from "./files/firebase.js";
// getting DOM values


var input = document.getElementById('input')
var saveBtn = document.getElementById('save')
var ul = document.getElementById('ul')

//todo ka kam yaha he

// saveBtn.addEventListener('click', () => {
        // if (input.value == '') {
        //         alert('Please Write Your ToDo')
        //     } else {
        //             ul.innerHTML += `
        //             <div class="main2 d-flex mt-3 col-12 id='div'">
        //             <li class='li' id='li'>
        //             ${input.value}
        //             </li>
        //             <button class="edit mx-3" id='edit' >Edit</button>
        //             <button class="delete" id='delete'>Delete</button>
        //             </div>
        //             `
        // var li = document.getElementById('li')
        // var edit = document.getElementById('edit')
        // var dlt = document.getElementById('delete')
        // var div = document.getElementById('div')
        // input.value = ''
        // edit.addEventListener('click', () => {
        //         var changevalue = prompt('Enter New Value')
        //         if (changevalue == '') {
        //                 alert('Enter Your ToDo')
        
        //             } else {
            
        //                 li.innerText = changevalue
        //             }
        
        //         })
        //         dlt.addEventListener('click', () => {
        //                 div.remove()
            
        //             })
        //         }
            // })  
            
            
            const db = getFirestore(app);
            saveBtn.addEventListener('click',async ()=>{

                // setting data to fireBase
                
                try {
                    const docRef = await addDoc(collection(db, "todo"), {
                        toDo: `${input.value}`,
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
                
                input.value= ''

                //  END   setting data to fireBase

                gettingDataFromFireBase()
            })
            async function gettingDataFromFireBase() {
                
                const querySnapshot = await getDocs(collection(db, "todo"));
                
                querySnapshot.forEach((doc) => {
                    let [dStructure] = doc.data()
                    ul.innerHTML+=`<li>${dStructure}</li>`

                    // console.log(`${doc.id} => ${doc.data()}`);

                });
            }
            gettingDataFromFireBase()

//impot karrha hu auth ko firebase.js se

import { auth } from "./files/firebase.js";

//auth state change wala kam yaha he

onAuthStateChanged(auth, (user) => {

    if (user) {
      console.log('state wala manjan ok');
      
      const uid = user.uid;
    } else {
        window.location.href='login.html'
    }
    
});

//sign out wala kam yaha he

  let logout = document.getElementById('logout')

  logout.addEventListener('click',()=>{
    signOut(auth).then(() => {
        window.location.href='login.html'
      }).catch((error) => {
        // An error happened.
      });
  })

// import {onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
// import {collection, addDoc,getFirestore,getDocs   } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
// import { app } from "./files/firebase.js";
// // getting DOM values


// var input = document.getElementById('input')
// var saveBtn = document.getElementById('save')
// var ul = document.getElementById('ul')

// //todo ka kam yaha he

// // saveBtn.addEventListener('click', () => {
//         // if (input.value == '') {
//         //         alert('Please Write Your ToDo')
//         //     } else {
//         //             ul.innerHTML += `
//         //             <div class="main2 d-flex mt-3 col-12 id='div'">
//         //             <li class='li' id='li'>
//         //             ${input.value}
//         //             </li>
//         //             <button class="edit mx-3" id='edit' >Edit</button>
//         //             <button class="delete" id='delete'>Delete</button>
//         //             </div>
//         //             `
//         // var li = document.getElementById('li')
//         // var edit = document.getElementById('edit')
//         // var dlt = document.getElementById('delete')
//         // var div = document.getElementById('div')
//         // input.value = ''
//         // edit.addEventListener('click', () => {
//         //         var changevalue = prompt('Enter New Value')
//         //         if (changevalue == '') {
//         //                 alert('Enter Your ToDo')
        
//         //             } else {
            
//         //                 li.innerText = changevalue
//         //             }
        
//         //         })
//         //         dlt.addEventListener('click', () => {
//         //                 div.remove()
            
//         //             })
//         //         }
//             // })  
            
            
//             const db = getFirestore(app);
//             saveBtn.addEventListener('click',async ()=>{

//                 // setting data to fireBase
                
//                 try {
//                     const docRef = await addDoc(collection(db, "todo"), {
//                         toDo: `${input.value}`,
//                     });
//                     console.log("Document written with ID: ", docRef.id);
//                 } catch (e) {
//                     console.error("Error adding document: ", e);
//                 }
                
//                 input.value= ''

//                 //  END   setting data to fireBase

//                 ul.innerHTML=''
//                 gettingDataFromFireBase()
//             })

//             async function gettingDataFromFireBase() {
                
//                 const querySnapshot = await getDocs(collection(db, "todo"));
                
//                 querySnapshot.forEach((doc) => {

//                     ul.innerHTML=''

//                     ul.innerHTML += `
//                     <div class="main2 d-flex mt-3 col-12 id='div'">
//                     <li class='li' id='li'>
//                     ${doc.data().toDo}
//                     </li>
//                     <button class="edit mx-3" id='edit' >Edit</button>
//                     <button class="delete" id='delete'>Delete</button>
//                     </div>
//                     `
                    
//         var li = document.getElementById('li')
//         var edit = document.getElementById('edit')
//         var dlt = document.getElementById('delete')
//         var div = document.getElementById('div')
//         input.value = ''
//         edit.addEventListener('click', () => {
//                 var changevalue = prompt('Enter New Value')
//                 if (changevalue == '') {
//                         alert('Enter Your ToDo')
        
//                     } else {
            
//                         li.innerText = changevalue
//                     }
        
//                 })
//                 dlt.addEventListener('click', () => {
//                         div.remove()
            
//                     })
//                 });
//             }
            
//             gettingDataFromFireBase()

// //impot karrha hu auth ko firebase.js se

// import { auth } from "./files/firebase.js";

// //auth state change wala kam yaha he

// onAuthStateChanged(auth, (user) => {

//     if (user) {
//       console.log('state wala manjan ok');
      
//       const uid = user.uid;
//     } else {
//         window.location.href='login.html'
//     }
    
// });

// //sign out wala kam yaha he

//   let logout = document.getElementById('logout')

//   logout.addEventListener('click',()=>{
//     signOut(auth).then(() => {
//         window.location.href='login.html'
//       }).catch((error) => {
//         // An error happened.
//       });
//   })









import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, addDoc, getFirestore, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { app, auth } from "./files/firebase.js"; // Import auth from firebase.js

// DOM Elements
const input = document.getElementById('input');
const saveBtn = document.getElementById('save');
const ul = document.getElementById('ul');

// Initialize Firestore
const db = getFirestore(app);

// Save button event listener
saveBtn.addEventListener('click', async () => {
    if (input.value === '') {
        Swal.fire('Oops...', 'Please Write Your ToDo', 'warning');
    } else {
        try {
            await addDoc(collection(db, "todo"), {
                toDo: input.value
            });
            console.log("Document successfully added!");
            input.value = ''; // Clear input after saving
            ul.innerHTML = ''; // Clear the list to avoid duplicates
            await gettingDataFromFireBase(); // Refresh the list
        } catch (e) {
            console.error("Error adding document: ", e);
            Swal.fire('Error!', 'There was an issue saving your to-do. Please try again.', 'error');
        }
    }
});

// Fetch and display data from Firestore
async function gettingDataFromFireBase() {
    const querySnapshot = await getDocs(collection(db, "todo"));
    ul.innerHTML = ''; // Clear list before appending

    querySnapshot.forEach((docSnapshot) => {
        const todoItem = docSnapshot.data().toDo;
        const todoId = docSnapshot.id;

        // Create elements for each to-do item
        const div = document.createElement('div');
        div.className = 'main2 d-flex mt-3 col-12';

        const li = document.createElement('li');
        li.className = 'li';
        li.textContent = todoItem;

        const editBtn = document.createElement('button');
        editBtn.className = 'edit mx-3';
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'Delete';

        // Append elements
        div.appendChild(li);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        ul.appendChild(div);

        // Edit button event listener with SweetAlert
        editBtn.addEventListener('click', async () => {
            const { value: newValue } = await Swal.fire({
                title: 'Edit To-Do',
                input: 'text',
                inputLabel: 'New Value',
                inputValue: todoItem,
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!';
                    }
                }
            });

            if (newValue) {
                try {
                    await updateDoc(doc(db, "todo", todoId), { toDo: newValue });
                    li.textContent = newValue; // Update UI
                    console.log(`Document with ID ${todoId} updated successfully.`);
                    Swal.fire('Updated!', 'Your To-Do has been updated.', 'success');
                } catch (e) {
                    console.error("Error updating document: ", e);
                    Swal.fire('Error!', 'There was an issue updating your to-do. Please try again.', 'error');
                }
            }
        });

        // Delete button event listener with SweetAlert
        deleteBtn.addEventListener('click', async () => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            });

            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "todo", todoId));
                    div.remove(); // Remove from UI
                    console.log(`Document with ID ${todoId} deleted successfully.`);
                    Swal.fire('Deleted!', 'Your To-Do has been deleted.', 'success');
                } catch (e) {
                    console.error("Error deleting document: ", e);
                    Swal.fire('Error!', 'There was an issue deleting your to-do. Please try again.', 'error');
                }
            }
        });
    });
}

// Initial fetch of data
gettingDataFromFireBase();

// Auth state change handling
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is authenticated');
    } else {
        window.location.href = 'login.html';
    }
});

// Logout button event listener
const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
});

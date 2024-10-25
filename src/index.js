// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBVtKAzZQB6lS9lvA_ciQ_NQX0icQlyupQ",
//   authDomain: "react-d3b3c.firebaseapp.com",
//   projectId: "react-d3b3c",
//   storageBucket: "react-d3b3c.appspot.com",
//   messagingSenderId: "510834341268",
//   appId: "1:510834341268:web:5fa6e38fe6f348b0364b81"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


//--------------------------------------------------------------------------------------

import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app"

import{
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc
}from 'firebase/firestore'

import{
  getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged
}from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBVtKAzZQB6lS9lvA_ciQ_NQX0icQlyupQ",
  authDomain: "react-d3b3c.firebaseapp.com",
  projectId: "react-d3b3c",
  storageBucket: "react-d3b3c.appspot.com",
  messagingSenderId: "510834341268",
  appId: "1:510834341268:web:5fa6e38fe6f348b0364b81"
};

// init firebase app
firebase.initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth = getAuth()

//collection ref
const colRef = collection(db, 'books')

// get collection data
// getDocs(colRef)
// .then((snapshot)=>{
//   let books = []
//   snapshot.docs.forEach((doc)=>{
//     books.push({ ...doc.data(), id: doc.id})
//   })
//   console.log(books);
// }).catch(err =>{
//   console.log(err.message)
// })


// queries 
const q = query(colRef, orderBy('createdAt'))


onSnapshot(q, (snapshot) =>{
  let books = []
  snapshot.docs.forEach((doc)=>{
    books.push({ ...doc.data(), id: doc.id})
  })
  console.log(books)
})


//adding a book

const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  }).then(() => {
    addBookForm.reset();
  })
})



//deleting books

const deleteBooksForm = document.querySelector('.delete')
deleteBooksForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBooksForm.id.value)

  deleteDoc(docRef).then(()=>{
    deleteBooksForm.reset()
  })
})


//getting a single document

const  docRef = doc(db, 'books', 'kac53CMU87X1ezTgyBYi')

onSnapshot(docRef, (doc)=>{
  console.log(doc.data(), doc.id)
})


//update a document
 const updateForm = document.querySelector('.update')
 updateForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'

  }).then(()=>{
    updateForm.reset
  })


 })





 // signup users

const signupForm  = document.querySelector('.signup')
signupForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const email = signupForm.email.value
  const password =signupForm.password.value
  createUserWithEmailAndPassword(auth, email, password )
  .then((cred)=>{
    console.log('user created', cred.user)
    signupForm.reset()
  }).catch((err)=>{
    console.log(err.message)
  })
})

//loggin and out


const LogoutButton = document.querySelector('.logout')
LogoutButton.addEventListener('click', (e)=>{
    signOut(auth)
    .then(()=>{
      //console.log('the user signed out')
    }).catch((err)=>{
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth,email, password).then((cred)=>{
    //console.log('user loged in:', cred.user)
    res.sendfile('./home.html')
  }).catch((err)=>{
    console.log(err.message)
  })

})



//subscribing to auth changes

onAuthStateChanged(auth, (user)=>{
  console.log('user sattus change:', user)
})

//unscribe form changes (auth /  db)

const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', ()=>{

})


//----------------------------------------------------------------



// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// // Configuração do Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBVtKAzZQB6lS9lvA_ciQ_NQX0icQlyupQ",
//   authDomain: "react-d3b3c.firebaseapp.com",
//   projectId: "react-d3b3c",
//   storageBucket: "react-d3b3c.appspot.com",
//   messagingSenderId: "510834341268",
//   appId: "1:510834341268:web:5fa6e38fe6f348b0364b81"
// };

// // Inicializa o Firebase
// const app = initializeApp(firebaseConfig);

// // Inicializa o Firestore
// const db = getFirestore(app);

// // Referência da coleção
// const colRef = collection(db, 'books');

// // Obtém os dados da coleção
// getDocs(colRef)
//   .then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       console.log(doc.data());
//     });
//   })
//   .catch((error) => {
//     console.error("Erro ao obter documentos: ", error);
//   });

 
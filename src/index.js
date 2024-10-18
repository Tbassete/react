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
  getFirestore, collection, getDocs, addDoc, deleteDoc, doc
}from 'firebase/firestore'

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


//collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef).then((snapshot)=>{
  let books = []
  snapshot.docs.forEach((doc)=>{
    books.push({ ...doc.data(), id: doc.id})
  })
  console.log(books);
}).catch(err =>{
  console.log(err.message)
})


//adding a book

const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
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

 
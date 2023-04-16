// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getFirestore, setDoc, addDoc, doc, updateDoc, deleteDoc, getDoc, query, collection, where, getDocs, onSnapshot,  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmVZazd1cBsO5mftadw5HppCKu-JC4GRY",
  authDomain: "krishiconnect-64752.firebaseapp.com",
  databaseURL: "https://krishiconnect-64752-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "krishiconnect-64752",
  storageBucket: "krishiconnect-64752.appspot.com",
  messagingSenderId: "641022690248",
  appId: "1:641022690248:web:0f6761e2847339d69536fd",
  measurementId: "G-4Z04QQF90G"
};

// Initialize Firebase0
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);





var email=document.getElementById("user");
var password=document.getElementById("pass") ;
var fname=document.getElementById("fname");
var lname=document.getElementById("lname");
var email=document.getElementById("email");
var username="";

window.signup=(e)=>{
  e.preventDefault(); 
  var obj={
    fname:fname.value,
    lname:lname.value,
    email:email.value,
    password:password.value

  }
  createUserWithEmailAndPassword(auth,obj.email,obj.password)
  .then(function(success){
    alert("Signup Successful");
    username=obj.email;
    addDoc(collection(db, username), {
     
    });


  }
  )
  .catch(function(err){
    alert("error"+ err)
  })
  console.log(obj)

}


var userid=document.getElementById("User1");
var pass=document.getElementById("pass1");
console.log(userid);
window.login=(e)=>{
  e.preventDefault();
  var obj2={
    email:userid.value,
    password:pass.value
  };
  console.log(obj2);

  signInWithEmailAndPassword(auth, obj2.email, obj2.password)
  .then(function(userCredential){
    // Signed in 
    alert("login successful");
    window.location.href="home.html"
    console.log(obj2);
    username=obj2.email;
  })
  .catch(function(err){
    alert("error"+ err)
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    username=user.email;
    getAllData(username);
  console.log(uid, username, user.fname);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// Initialize Cloud Firestore and get a reference to the service
var pNo=0;

var submitform=document.getElementById("submitform");
submitform.addEventListener('click',(e)=>{
  e.preventDefault();
  var product = document.getElementById("Product").value;
  var category = document.getElementById("category").value;
  var quantity = document.getElementById("quantity").value;
  var unit = document.getElementById("unit").value;

addDoc(collection(db, username ), {
    product:product,
    category:category,
    quantity:quantity,
    unit:unit
});
console.log(username.id);

alert("product added");
}
)
console.log('qwe'+username)
var stdNo=0;

var tbody= document.getElementById("tbody1");

function addItem(product, category, quantity, unit, id){
  var trow=document.createElement('tr');
  var td1=document.createElement('td');
  var td2=document.createElement('td');
  var td3=document.createElement('td');
  var td4=document.createElement('td');
  var td5=document.createElement('td');
  // var td6=document.createElement('td');
//"

  td1.innerHTML=++stdNo;
  td2.innerHTML=product;
  td3.innerHTML=category;
  td4.innerHTML=quantity;
  td5.innerHTML=unit;
  // td6.innerHTML="<button type='button' onClick='Deleterow(id)'>Delete</button>";
  

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  // trow.appendChild(td6);

 tbody.appendChild(trow);
}

function allItem(productlist){
 stdNo=0;
 tbody.innerHTML="";
 console.log("Document data:", users);
productlist.forEach(element=>{
   addItem(element.product,element.category, element.quantity, element.unit, element.id);
   console.log(element.product);
})

}

console.log('asd'+username);
var users = [];
async function getAllData(username){
 await getDocs(collection(db, username),).then(docSnap => {
            
            docSnap.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id })
            });
            
            
        });
        allItem(users);
        
}

    window.Deleterow=(id)=>{
      deleteDoc(doc(db, username, id));

    }

 






 

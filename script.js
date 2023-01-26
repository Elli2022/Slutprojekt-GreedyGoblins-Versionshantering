//Vad som ska importeras från Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

//Allt relaterat till Firebase.
const firebaseConfig = {
  databaseURL:
    "https://projekt1-97671-default-rtdb.europe-west1.firebasedatabase.app/",
  apiKey: "AIzaSyDianSNbCGNVs8WJ35olsQP3fJt7JcZJec",
  authDomain: "projekt1-97671.firebaseapp.com",
  projectId: "projekt1-97671",
  storageBucket: "projekt1-97671.appspot.com",
  messagingSenderId: "125852933537",
  appId: "1:125852933537:web:5c52ecb7495050a7e63fe0",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(db);

let alienAnimation = anime({
  targets: '#alien',
  delay: 0,
  keyframes: [
    {translateY: '70'},
    {translateX: '-45'},
    {rotate: '-75'},
    {translateY: '-250'},
    {opacity: 0},
  ],
  duration: 1500,
  autoplay: false,
})
  // funktion kollar ifall value på inName är samma som alien
function alienAppear() {
    if (document.getElementById('inName').value.indexOf("alien") > -1) {
        console.log('alien') 
        let alien = document.getElementById('alien')
        // gör alien synlig och spelar en animation
        alien.style.display= "block"
        alienAnimation.play();     
      }else{
        document.getElementById('alien').style.display = "none"
      }
}

//Funktionen
let content = document.getElementById("content");
let btn = document.getElementById("btn");
let array = [];
btn.addEventListener("click", () => {
  writeUserData();
  resetText();
  alienAppear();
  onValue(
    ref(db, "/"),
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        let item = document.createElement("h4");
        item.className = "headern";
        item.setAttribute("name", childKey);
        item.innerHTML = `${childKey} ${childData.message} ${childData.dateOfCreation} `;
        content.appendChild(item);
        array.push(item);
      });
      removeHeader();
    },
    { onlyOnce: true }
  );
});


//Funktion för att skriva ut värden från input + datum
function writeUserData() {
  let inputName = document.getElementById("inName").value;
  set(ref(db, inputName), {
    message: "",
    dateOfCreation: new Date().toLocaleDateString(),
  });
}

//Rendera det på DOM
const urlRef = ref(db, "Dany");
onValue(
  urlRef,
  (snapshot) => {
    const data = snapshot.val();
  },
  { onlyOnce: true }
);

//Funktion som rensar array + innerHTML
function resetText() {
  array = [];
  content.innerHTML = "";
}

//Tar bort element från DOM & Databasen
function removeHeader() {
  array.forEach((element) => {
    element.addEventListener("click", () => {
      let name = element.getAttribute("name");
      remove(ref(db, name)).then(() => {
        element.remove();
      });
    });
  });
}

//Dark mode
let buttonMode = document.getElementById("buttonMode");
let body = document.getElementById("body");
let titel = document.getElementById("titel");
let inName = document.getElementById("inName");


buttonMode.addEventListener("click", () => {});

buttonMode.addEventListener("click", () => {
  if (mode.content == "light") {
    mode.content = "dark";
    body.style.backgroundImage = "url(./bgdark.jpg)";
    body.style.color = "whitesmoke";
    buttonMode.innerHTML = '<i class="fa-solid fa-lightbulb"></i>';
    buttonMode.style.color = "black";
    titel.style.textDecoration = "double underline black";
    inName.style.border = "5px solid black";
    inName.style.color = "white";
    btn.style.backgroundColor = "black";
    btn.style.border = "5px solid whitesmoke";
    console.log("dark");
  } else {
    mode.content = "light";
    body.style.backgroundImage = "url(./bg.jpg)";
    body.style.color = "";
    buttonMode.innerHTML = `<i class="fa-regular fa-lightbulb"></i>`;
    buttonMode.style.color = "rgb(17, 218, 118)";
    titel.style.textDecoration = "";
    inName.style.border = "";
    inName.style.color = "";
    btn.style.backgroundColor = "";
    btn.style.border = "";
    console.log("light");
  }
});

const ghost = document.querySelector('#ghost');

ghost.addEventListener('mouseover', function(){
  ghost.classList.add('skitzad');
})

ghost.addEventListener('mouseout', function(){
  ghost.classList.remove('skitzad');
})
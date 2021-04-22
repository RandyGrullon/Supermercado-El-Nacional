const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});




function Login(){

  var email= document.getElementById("email").value;
  var password= document.getElementById("pass").value;

  firebase.auth().signInWithEmailAndPassword(email,password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.href = 'Index.html';
    console.log("logged");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("error:"  + errorMessage);
    console.log("error al loggear");
  });
  

  
}


function SignUp(){

  var email= document.getElementById("newEmail").value;
  var password= document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..

    window.alert("error:" + errorMessage);
  });


  
}




const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password=> {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: {
               email,
               password
            }
            .then(response => response.json())
          })
          .catch(error => {
            console.log(error);
          });
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); 
       forms.classList.toggle("show-signup");
    })
})

const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', async (e) =>{
  e.preventDefault()

  const email = signupForm['signup-email'].value
  const password = signupForm['signup-password'].value
  const password2 =signupForm['signup-password2'].value
console.log(email, password, password2)
try {
  
const userCredentials = await createUserWithEmailAndPassword(auth, email, password, password2)
console.log(userCredentials)

} catch (error) {
  console.log(error)
}

}

)
const form = document.querySelector("#loginForm");
document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
      loginButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevents page reload

        const emailAddress = document.querySelector("#emailAddress").value;
        const password = document.querySelector("#password").value;
    console.log(emailAddress);
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailAddress, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => alert(data.message))
        .catch((error) => alert(error.message));
      });
  } else {
      console.error('Login button not found!');
  }
});


// form.addEventListener("submit", (e) => {
//     e.preventDefault(); // Prevents page reload

//     const emailAddress = document.querySelector("#emailAddress").value;
//     const password = document.querySelector("#password").value;

//     fetch('http://localhost:3001/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ emailAddress, password }),
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Login failed');
//         }
//         return response.json();
//     })
//     .then(data => alert(data.message))
//     .catch((error) => alert(error.message));
// });

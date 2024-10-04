const form = document.querySelector("#registerForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const username = document.querySelector("#username").value;
    const emailAddress = document.querySelector("#emailAddress").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    if (password !== confirmPassword) {
        alert(`Passwords don't match`);
        return;
    }

    const user = {
        firstName,
        lastName,
        username,
        emailAddress,
        password,
    };

    fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return response.json();
    })
    .then(data => {
        // Show the SweetAlert success message
        return Swal.fire({
            title: "Registered Successfully",
            text: "Please login",
            icon: "success",
            confirmButtonColor: "#f82249"
        });
    })
    .then(() => {
        // Redirect to login.html after the SweetAlert is closed
        window.location.href = "login.html";
    })
    .catch((error) => alert('Registration failed: ' + error.message));
});


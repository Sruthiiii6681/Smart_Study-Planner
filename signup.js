const form = document.getElementById('signupForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from actually submitting

    // Simulating sign-up logic (store details, validate inputs)
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    if (username && email && password) {
        // Here you would typically send the data to the server to create a new user
        alert('Sign Up Successful! Redirecting to the login page...');
        window.location.href = 'dashboard.html'; // Redirect to login page after successful sign-up
    } else {
        alert('Please fill in all the fields.');
    }
});






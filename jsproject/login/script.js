firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google login
document.getElementById('google-login').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            window.location.href = "dashboard.html"; // Redirect to the dashboard or any other page
        })
        .catch((error) => {
            console.error('Google Login Error:', error);
        });
});

// iOS login (using Apple provider)
document.getElementById('ios-login').addEventListener('click', () => {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    auth.signInWithPopup(provider)
        .then((result) => {
            window.location.href = "dashboard.html"; // Redirect to the dashboard or any other page
        })
        .catch((error) => {
            console.error('iOS Login Error:', error);
        });
});

// Email and Password login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location.href = "dashboard.html"; // Redirect to the dashboard or any other page
        })
        .catch((error) => {
            console.error('Email/Password Login Error:', error);
        });
});

// Forgot Password
document.getElementById('forgot-password').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    if (email) {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email sent!');
            })
            .catch((error) => {
                console.error('Forgot Password Error:', error);
            });
    } else {
        alert('Please enter your email address.');
    }
});
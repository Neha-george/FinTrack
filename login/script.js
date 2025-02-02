// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEP0jDcVYMef0xA4G7VhmzUN2E3wPd88E",
    authDomain: "budget-tracker-29215.firebaseapp.com",
    projectId: "budget-tracker-29215",
    storageBucket: "budget-tracker-29215.firebasestorage.app",
    messagingSenderId: "1097818738842",
    appId: "1:1097818738842:web:31e05e8e00677442e70f23",
    measurementId: "G-V9Y7KWVMHE"
  };

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
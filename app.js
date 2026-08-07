// Import Firebase modules (using version 12.17.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTxiPyXvFXghmvneGYVsBfHh12XAITVrk",
    authDomain: "delulu-travels.firebaseapp.com",
    projectId: "delulu-travels",
    storageBucket: "delulu-travels.firebasestorage.app",
    messagingSenderId: "327556422987",
    appId: "1:327556422987:web:7920453402a78c67d31cce",
    measurementId: "G-BDE5FXHGXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let isSignUp = true;

// Toggle between Login and Sign Up UI
window.toggleMode = function() {
    isSignUp = !isSignUp;
    document.getElementById("form-title").innerText = isSignUp ? "Sign Up" : "Log In";
    document.getElementById("submit-btn").innerText = isSignUp ? "Register" : "Log In";
    document.querySelector(".toggle-btn").innerText = isSignUp ? 
        "Already have an account? Log in" : "Don't have an account? Sign up";
}

// Handle Form Submission (Stores data & authenticates)
const form = document.getElementById("auth-form");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            if (isSignUp) {
                // Creates user and stores credentials in Firebase Auth
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Account created successfully!");
            } else {
                // Logs user in
                await signInWithEmailAndPassword(auth, email, password);
            }
            // Redirect to dashboard on success
            window.location.href = "dashboard.html";
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}

// Handle Logout on Dashboard
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "index.html";
    });
}
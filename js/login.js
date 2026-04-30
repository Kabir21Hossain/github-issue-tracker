// login.js -Handles login page logic

const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'admin123';

let isLoggedIn = false;
let isEyeClosed=true;

if (isLoggedIn) {
    window.location.href = 'dashboard.html';
}

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('login-error');
const loginSpinner = document.getElementById('loginSpinner');
const loginBtnText = document.getElementById('loginBtnText');
const fillDemoBtn = document.getElementById('fillDemoBtn');
const togglePassword = document.getElementById('togglePassword');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');


loginBtn.addEventListener('click', () => handleLogin());
fillDemoBtn.addEventListener('click', () => fillDemoCredentials());
togglePassword.addEventListener('click', () => togglePasswordVisibility());
usernameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleLogin();
    }
});

passwordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleLogin();
    }
});

// handle login
const handleLogin = () => {
    const name = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !password) {
        loginError.classList.remove('hidden');
        loginError.querySelector('span').textContent = 'Please enter both username and password.';
        return;
    }

    // show loading
    loginBtnText.textContent = `Signing in...`;
    loginSpinner.classList.remove('hidden');
    loginBtn.disabled = true;

    setTimeout(() => {
        if (name === DEMO_USERNAME && password === DEMO_PASSWORD) {
            isLoggedIn = true;
            window.location.href = 'dashboard.html';
        }

        else{
            loginError.classList.remove('hidden');
            loginError.querySelector('span').textContent='Invalid username or password. Please try again.';
            loginBtnText.textContent='Sign In';
            loginSpinner.classList.add('hidden');
            loginBtn.disabled=false;
            usernameInput.classList.add('input-error');
            passwordInput.classList.add('input-error');
        }

    },100);

}

const fillDemoCredentials=()=>{
    usernameInput.value=DEMO_USERNAME;
    passwordInput.value=DEMO_PASSWORD;
    
}

const togglePasswordVisibility=()=>{
    if(isEyeClosed===true){
        passwordInput.type='text';
        eyeOpen.classList.toggle('hidden');
        eyeClosed.classList.toggle('hidden');
        isEyeClosed=false;

    }
    else{
        passwordInput.type='password';
        eyeOpen.classList.toggle('hidden');
        eyeClosed.classList.toggle('hidden');
        isEyeClosed=true;

    }
}


const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerButton.addEventListener('click', () => {
    loginForm.classList.add('hide-element');
    loginForm.classList.remove('show-element');
    registerForm.classList.add('show-element');
    registerForm.classList.remove('hide-element');
});

loginButton.addEventListener('click', () => {
    registerForm.classList.add('hide-element');
    registerForm.classList.remove('show-element');
    loginForm.classList.add('show-element');
    loginForm.classList.remove('hide-element');
});
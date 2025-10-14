// ---------- LOGIN ---------- //
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("loginError");

    if (username === "admin" && password === "password") {
        window.location.href = "mainPage.html";
    } else {
        errorMsg.style.display = "block";
    }
}

function forgotPassword() {
    alert("Usuário: admin\nSenha: password");
}

// ---------- CARROSSEL ---------- //
const slider = document.querySelectorAll('.slider');
const next = document.getElementById('next');
const back = document.getElementById('back');
let currentSlide = 0;

// Esconde todos os slides
function hideSlider() {
    slider.forEach(item => item.classList.remove('on'));
}

// Inicializa slider de acordo com a largura da tela
function initSlider() {
    const width = window.innerWidth;

    if (width >= 992) {
        // Desktop: mostrar todos os slides
        slider.forEach(item => item.classList.add('on'));
        next.style.display = "none";
        back.style.display = "none";
    } else {
        // Mobile/Tablet: resetar e mostrar primeiro(s)
        slider.forEach(item => item.classList.remove('on'));
        currentSlide = 0;

        const visibleSlides = width >= 600 ? 2 : 1; // tablet=2, mobile=1
        for (let i = 0; i < visibleSlides && i < slider.length; i++) {
            slider[i].classList.add('on');
        }

        next.style.display = "block";
        back.style.display = "block";
    }
}

// Avançar slide
function nextSlider() {
    const width = window.innerWidth;
    const visibleSlides = width >= 600 ? 2 : 1;

    hideSlider();
    currentSlide += visibleSlides;
    if (currentSlide >= slider.length) currentSlide = 0;

    for (let i = currentSlide; i < currentSlide + visibleSlides && i < slider.length; i++) {
        slider[i].classList.add('on');
    }
}

// Voltar slide
function backSlider() {
    const width = window.innerWidth;
    const visibleSlides = width >= 600 ? 2 : 1;

    hideSlider();
    currentSlide -= visibleSlides;
    if (currentSlide < 0) currentSlide = slider.length - visibleSlides;

    for (let i = currentSlide; i < currentSlide + visibleSlides && i < slider.length; i++) {
        slider[i].classList.add('on');
    }
}

// Eventos
next.addEventListener('click', nextSlider);
back.addEventListener('click', backSlider);
window.addEventListener('resize', initSlider);
window.addEventListener('load', initSlider);

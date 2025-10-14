// ---------- CARROUSEL ---------- //

const slider = document.querySelectorAll('.slider');
const next = document.getElementById('next');
const back = document.getElementById('back');

let currentSlide = 0;
// FUNÇÃO PARA ESCONDER O SLIDE
function hideSlider() {
    slider.forEach(item => item.classList.remove('on'));
}
// FUNÇÃO PARA MOSTRAR O SLIDE
function showSlider() {
    slider[currentSlide].classList.add('on');
}

// MIQUÉIAS

function nextSlider(){
    hideSlider();
    if(currentSlide == slider.length -1){
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    showSlider();
}

function backSlider(){
    hideSlider();
    if(currentSlide == 0){
        currentSlide = slider.length -1;
    } else {
        currentSlide--;
    }
    showSlider();
}

next.addEventListener('click' , nextSlider);
back.addEventListener('click'   , backSlider);

function forgotPassword() {
    alert("Usuário: admin\nSenha: password");
}

//---------- LOGIN ----------//

function forgotPassword() {
    alert("Usuário: admin\nSenha: password");
}

function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if (username === "admin" && password === "password") {
        window.location.href = "mainPage.html"; // Redirect to dashboard or another page
    } else {
        alert("Usuário ou senha incorretos. Tente novamente!");
    }
}
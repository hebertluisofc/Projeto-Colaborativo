// ---------- MAIN PAGE CARROSSEL ---------- //

// Seletores
const sliders = document.querySelectorAll(".slider");
const btnNext = document.getElementById("next");
const btnBack = document.getElementById("back");

let currentIndex = 0;    // índice atual do carrossel
let itemsPerView = getItemsPerView(); // quantos itens aparecem na tela

// Função: descobre quantos itens devem aparecer dependendo do viewport
function getItemsPerView() {
    const width = window.innerWidth;
    if (width >= 992) return 4; // Desktop
    if (width >= 600) return 2; // Tablet
    return 1;                   // Mobile
}

// Função: atualiza a exibição dos slides
function showSlides() {
    sliders.forEach((slide, i) => {
        slide.classList.remove("on");
        slide.style.display = "none";
    });

    // Mostra os itens correspondentes ao currentIndex
    for (let i = 0; i < itemsPerView; i++) {
        let index = (currentIndex + i) % sliders.length;
        sliders[index].classList.add("on");
        sliders[index].style.display = "flex";
    }
}

// Funções de navegação
function nextSlide() {
    currentIndex = (currentIndex + itemsPerView) % sliders.length;
    showSlides();
}

function prevSlide() {
    currentIndex = (currentIndex - itemsPerView + sliders.length) % sliders.length;
    showSlides();
}

// Event listeners
btnNext?.addEventListener("click", nextSlide);
btnBack?.addEventListener("click", prevSlide);

// Recalcular quando a tela for redimensionada
window.addEventListener("resize", () => {
    itemsPerView = getItemsPerView();
    currentIndex = 0; // reseta para o início
    showSlides();
});

// Inicialização
showSlides(); a
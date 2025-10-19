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

// ---------- Mostrar/esconder senha ---------- //
document.addEventListener("DOMContentLoaded", () => {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            togglePassword.textContent = type === "password" ? "😑" : "😳";
        });
    } else {
        console.warn("togglePassword ou passwordInput não encontrados!");
    }
});
function showArmario(index) {
    hideSlider(); // esconde todos
    currentSlide = index;
    slider[currentSlide].classList.add('on');
    initSlider(); // recalcula tamanho e visibilidade
}


// ---------- Esqueci a senha ---------- //
function forgotPassword() {
    forgotPasswordPopup();
}

// ---------- POPUP DE RECUPERAÇÃO DE SENHA ---------- //
function forgotPasswordPopup() {
    const usuario = "admin";
    const senha = "password";

    const popupFundo = document.createElement("div");
    Object.assign(popupFundo.style, {
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000
    });

    const popup = document.createElement("div");
    Object.assign(popup.style, {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "280px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif"
    });

    const titulo = document.createElement("h2");
    titulo.textContent = "Recuperar senha!";

    const info = document.createElement("p");
    info.innerHTML = `<strong>Usuário:</strong> ${usuario}<br><strong>Senha:</strong> ${senha}`;

    const botaoFechar = document.createElement("button");
    botaoFechar.textContent = "Fechar";
    Object.assign(botaoFechar.style, {
        marginTop: "15px",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px"
    });
    botaoFechar.onclick = () => document.body.removeChild(popupFundo);

    popup.append(titulo, info, botaoFechar);
    popupFundo.appendChild(popup);
    document.body.appendChild(popupFundo);

    popupFundo.addEventListener("click", e => {
        if (e.target === popupFundo) document.body.removeChild(popupFundo);
    });
}

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
showSlides();

// ---------- POPUP DE ESTOQUE ---------- //
function abrirPopup(elemento) {
    const nomeProduto = elemento.dataset.product;
    let quantidadeEstoque = parseInt(elemento.dataset.amount);
    let valorAtual = 0;

    const popupFundo = document.createElement("div");
    Object.assign(popupFundo.style, { position:"fixed", top:0, left:0, width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.6)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:1000 });

    const popup = document.createElement("div");
    Object.assign(popup.style, { background:"#fff", padding:"20px", borderRadius:"12px", textAlign:"center", minWidth:"300px", boxShadow:"0 4px 12px rgba(0,0,0,0.3)", fontFamily:"Arial, sans-serif" });

    const titulo = document.createElement("h2");
    titulo.textContent = nomeProduto;

    const estoqueInfo = document.createElement("p");
    estoqueInfo.textContent = `Estoque atual: ${quantidadeEstoque}`;

    const valorDisplay = document.createElement("span");
    valorDisplay.textContent = valorAtual;
    Object.assign(valorDisplay.style, { margin:"0 20px", fontSize:"26px", fontWeight:"bold", color:"#000" });

    function atualizarPreview() {
        const final = quantidadeEstoque + valorAtual;
        estoqueInfo.textContent = `Estoque final previsto: ${final}`;
        valorDisplay.style.color = final < 0 ? "#dc3545" : final > 0 ? "#28a745" : "#000";
    }

    function criarBotao(texto, cor, fn) {
        const b = document.createElement("button");
        b.textContent = texto;
        Object.assign(b.style, { width:"50px", height:"50px", borderRadius:"50%", fontSize:"22px", fontWeight:"bold", border:"none", cursor:"pointer", backgroundColor:cor, color:"#fff", transition:"0.2s" });
        b.onmouseover = () => b.style.opacity="0.8";
        b.onmouseout = () => b.style.opacity="1";
        b.onclick = fn;
        return b;
    }

    const botaoMenos = criarBotao("−", "#dc3545", () => { if(quantidadeEstoque + valorAtual -1 >=0){ valorAtual--; valorDisplay.textContent=valorAtual; atualizarPreview(); } });
    const botaoMenos10 = criarBotao("-10", "#dc3545", () => { if(quantidadeEstoque + valorAtual -10 >=0){ valorAtual-=10; valorDisplay.textContent=valorAtual; atualizarPreview(); } });
    const botaoMais = criarBotao("+", "#28a745", () => { valorAtual++; valorDisplay.textContent=valorAtual; atualizarPreview(); });
    const botaoMais10 = criarBotao("+10", "#28a745", () => { valorAtual+=10; valorDisplay.textContent=valorAtual; atualizarPreview(); });

    const botoesContainer = document.createElement("div");
    Object.assign(botoesContainer.style,{ margin:"15px 0", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"});
    botoesContainer.append(botaoMenos10, botaoMenos, valorDisplay, botaoMais, botaoMais10);

    // Função para atualizar cores das células
    function atualizarCor(celula, qtd){
        celula.classList.remove("cellRed","cellYellow","cellGreen");
        if(qtd <= 10) celula.classList.add("cellRed");
        else if(qtd <= 50) celula.classList.add("cellYellow");
        else celula.classList.add("cellGreen");
    }

    const botoesAcoes = document.createElement("div");
    Object.assign(botoesAcoes.style,{ display:"flex", justifyContent:"space-between", gap:"10px", marginTop:"15px" });

    const botaoCancelar = document.createElement("button");
    botaoCancelar.textContent="Cancelar";
    Object.assign(botaoCancelar.style,{ flex:"1", padding:"10px", border:"none", borderRadius:"8px", backgroundColor:"#6c757d", color:"#fff", fontSize:"16px", cursor:"pointer" });
    botaoCancelar.onclick = () => popupFundo.remove();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.textContent="Confirmar";
    Object.assign(botaoConfirmar.style,{ flex:"1", padding:"10px", border:"none", borderRadius:"8px", backgroundColor:"#007bff", color:"#fff", fontSize:"16px", cursor:"pointer" });

    botaoConfirmar.onclick = () => {
        const popupFundoConfirm = document.createElement("div");
        Object.assign(popupFundoConfirm.style, { position:"fixed", top:0, left:0, width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.6)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:1100 });

        const popupConfirm = document.createElement("div");
        Object.assign(popupConfirm.style, { background:"#fff", padding:"20px", borderRadius:"12px", minWidth:"300px", textAlign:"center", boxShadow:"0 4px 12px rgba(0,0,0,0.3)", fontFamily:"Arial, sans-serif" });

        const mensagem = document.createElement("p");
        if(valorAtual>0) mensagem.textContent=`Você vai adicionar ${valorAtual} unidade(s) de ${nomeProduto}.`;
        else if(valorAtual<0) mensagem.textContent=`Você vai remover ${-valorAtual} unidade(s) de ${nomeProduto}.`;
        else mensagem.textContent=`Nenhuma alteração será feita no estoque de ${nomeProduto}.`;

        const btnContainer = document.createElement("div");
        Object.assign(btnContainer.style, { display:"flex", justifyContent:"space-between", gap:"10px", marginTop:"15px" });

        const btnConfirmarFinal = document.createElement("button");
        btnConfirmarFinal.textContent="Confirmar";
        Object.assign(btnConfirmarFinal.style,{ flex:"1", padding:"10px", border:"none", borderRadius:"8px", backgroundColor:"#007bff", color:"white", fontSize:"16px", cursor:"pointer" });

        const btnDesfazer = document.createElement("button");
        btnDesfazer.textContent="Desfazer";
        Object.assign(btnDesfazer.style,{ flex:"1", padding:"10px", border:"none", borderRadius:"8px", backgroundColor:"#dc3545", color:"white", fontSize:"16px", cursor:"pointer" });

        btnConfirmarFinal.onclick = () => {
            quantidadeEstoque += valorAtual;
            elemento.dataset.amount = quantidadeEstoque;
            elemento.querySelector("p").textContent = quantidadeEstoque;
            atualizarCor(elemento, quantidadeEstoque);
            const cabinetId = document.body.id.replace("body", "");
            salvarEstoque(cabinetId, elemento.id, elemento.dataset.product, quantidadeEstoque);
            popupFundoConfirm.remove();
            popupFundo.remove();
        };

        btnDesfazer.onclick = () => popupFundoConfirm.remove();

        btnContainer.append(btnDesfazer, btnConfirmarFinal);
        popupConfirm.append(mensagem, btnContainer);
        popupFundoConfirm.appendChild(popupConfirm);
        document.body.appendChild(popupFundoConfirm);
        popupFundoConfirm.addEventListener("click", e => { if(e.target===popupFundoConfirm) popupFundoConfirm.remove(); });
    };

    popup.append(titulo, estoqueInfo, botoesContainer);
    botoesAcoes.append(botaoCancelar, botaoConfirmar);
    popup.appendChild(botoesAcoes);
    popupFundo.appendChild(popup);
    document.body.appendChild(popupFundo);

    popupFundo.addEventListener("click", e => { if(e.target===popupFundo) popupFundo.remove(); });
}




// ---------- OUVIR ATUALIZAÇÕES EM TEMPO REAL ---------- //

window.onload = () => {
    const cabinetId = document.body.id.replace("body", ""); // ex: Cabinet1, Cabinet2...
    
    ouvirEstoque(cabinetId, (dados) => {
        for (const cellId in dados) {
            const item = dados[cellId];
            const celula = document.getElementById(cellId);

            if (celula) {
                // Atualiza os dados
                celula.dataset.product = item.produto;
                celula.dataset.amount = item.quantidade;

                // Atualiza título e quantidade na tela
                celula.querySelector("h3").textContent = item.produto;
                celula.querySelector("p").textContent = item.quantidade;

                // Atualiza cores
                celula.classList.remove("cellRed","cellYellow","cellGreen");
                if(item.quantidade <= 10) celula.classList.add("cellRed");
                else if(item.quantidade <= 50) celula.classList.add("cellYellow");
                else celula.classList.add("cellGreen");
            }
        }
    });
};


// ---------- FIM DO CÓDIGO ----------


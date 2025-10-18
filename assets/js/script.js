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

// Mostrar/esconder senha
function togglePassword(show) {
    const passwordInput = document.getElementById("password");
    passwordInput.type = show ? "text" : "password";
}

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

// ---------- CARROSSEL ---------- //
const slider = document.querySelectorAll('.slider');
const next = document.getElementById('next');
const back = document.getElementById('back');
let currentSlide = 0;

function hideSlider() {
    slider.forEach(item => item.classList.remove('on'));
}

function initSlider() {
    const width = window.innerWidth;

    if (width >= 992) {
        slider.forEach(item => item.classList.add('on'));
        next.style.display = "none";
        back.style.display = "none";
    } else {
        slider.forEach(item => item.classList.remove('on'));
        currentSlide = 0;

        const visibleSlides = width >= 600 ? 2 : 1;
        for (let i = 0; i < visibleSlides && i < slider.length; i++) {
            slider[i].classList.add('on');
        }

        next.style.display = "block";
        back.style.display = "block";
    }
}

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

next.addEventListener('click', nextSlider);
back.addEventListener('click', backSlider);
window.addEventListener('resize', initSlider);
window.addEventListener('load', initSlider);

// ---------- POPUP DE ESTOQUE ---------- //
function abrirPopup(elemento) {
    const nomeProduto = elemento.dataset.product;
    let quantidadeEstoque = parseInt(elemento.dataset.amount);

    const popupFundo = document.createElement("div");
    Object.assign(popupFundo.style, {
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000
    });

    const popup = document.createElement("div");
    Object.assign(popup.style, {
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        minWidth: "300px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif"
    });

    const titulo = document.createElement("h2");
    titulo.textContent = nomeProduto;

    const estoqueInfo = document.createElement("p");
    estoqueInfo.textContent = `Estoque atual: ${quantidadeEstoque}`;

    let valorAtual = 0;
    const valorDisplay = document.createElement("span");
    valorDisplay.textContent = valorAtual;
    Object.assign(valorDisplay.style, {
        margin: "0 20px", fontSize: "26px", fontWeight: "bold", color: "#000"
    });

    function atualizarPreview() {
        estoqueInfo.textContent = `Estoque final previsto: ${quantidadeEstoque + valorAtual}`;
        valorDisplay.style.color = valorAtual < 0 ? "#dc3545" : valorAtual > 0 ? "#28a745" : "#000";
    }

    function estilizarBotao(botao, cor) {
        Object.assign(botao.style, {
            width: "50px", height: "50px",
            borderRadius: "50%",
            fontSize: "22px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            backgroundColor: cor,
            color: "#fff",
            transition: "0.2s"
        });
        botao.onmouseover = () => botao.style.opacity = "0.8";
        botao.onmouseout = () => botao.style.opacity = "1";
    }

    const botaoMais = document.createElement("button");
    botaoMais.textContent = "+";
    estilizarBotao(botaoMais, "#28a745");
    botaoMais.onclick = () => { valorAtual++; valorDisplay.textContent = valorAtual; atualizarPreview(); };

    const botaoMenos = document.createElement("button");
    botaoMenos.textContent = "−";
    estilizarBotao(botaoMenos, "#dc3545");
    botaoMenos.onclick = () => { 
        if (valorAtual > -quantidadeEstoque) { 
            valorAtual--; valorDisplay.textContent = valorAtual; atualizarPreview(); 
        } 
    };

    const botoesContainer = document.createElement("div");
    Object.assign(botoesContainer.style, {
        margin: "15px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });
    botoesContainer.append(botaoMenos, valorDisplay, botaoMais);

    const botoesAcoes = document.createElement("div");
    Object.assign(botoesAcoes.style, {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        marginTop: "15px"
    });

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.textContent = "Confirmar";
    Object.assign(botaoConfirmar.style, {
        flex: "1", padding: "10px",
        border: "none", borderRadius: "8px",
        backgroundColor: "#007bff", color: "white",
        fontSize: "16px", cursor: "pointer"
    });

    const botaoCancelar = document.createElement("button");
    botaoCancelar.textContent = "Cancelar";
    Object.assign(botaoCancelar.style, {
        flex: "1", padding: "10px",
        border: "none", borderRadius: "8px",
        backgroundColor: "#6c757d", color: "white",
        fontSize: "16px", cursor: "pointer"
    });

    // ---------- CONFIRMAÇÃO COM BOTÃO DESFAZER ----------
    botaoConfirmar.onclick = () => {
        // Cria popup de confirmação
        const popupFundoConfirm = document.createElement("div");
        Object.assign(popupFundoConfirm.style, {
            position: "fixed",
            top: 0, left: 0,
            width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1100
        });

        const popupConfirm = document.createElement("div");
        Object.assign(popupConfirm.style, {
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "300px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            fontFamily: "Arial, sans-serif"
        });

        const mensagem = document.createElement("p");
        if (valorAtual > 0) mensagem.textContent = `Você vai adicionar ${valorAtual} unidade(s) de ${nomeProduto}.`;
        else if (valorAtual < 0) mensagem.textContent = `Você vai remover ${-valorAtual} unidade(s) de ${nomeProduto}.`;
        else mensagem.textContent = `Nenhuma alteração será feita no estoque de ${nomeProduto}.`;

        const btnContainer = document.createElement("div");
        Object.assign(btnContainer.style, {
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "15px"
        });

        const btnConfirmarFinal = document.createElement("button");
        btnConfirmarFinal.textContent = "Confirmar";
        Object.assign(btnConfirmarFinal.style, {
            flex: "1", padding: "10px",
            border: "none", borderRadius: "8px",
            backgroundColor: "#007bff", color: "white",
            fontSize: "16px", cursor: "pointer"
        });

        const btnDesfazer = document.createElement("button");
        btnDesfazer.textContent = "Desfazer";
        Object.assign(btnDesfazer.style, {
            flex: "1", padding: "10px",
            border: "none", borderRadius: "8px",
            backgroundColor: "#dc3545", color: "white",
            fontSize: "16px", cursor: "pointer"
        });

        btnConfirmarFinal.onclick = () => {
            // Aplica alteração
            quantidadeEstoque += valorAtual;
            elemento.dataset.amount = quantidadeEstoque;

            const p = elemento.querySelector("p");
            if (p) p.textContent = quantidadeEstoque;

            elemento.classList.remove("cellRed", "cellYellow", "cellGreen");
            if (quantidadeEstoque <= 10) elemento.classList.add("cellRed");
            else if (quantidadeEstoque <= 50) elemento.classList.add("cellYellow");
            else elemento.classList.add("cellGreen");

            document.body.removeChild(popupFundoConfirm);
            document.body.removeChild(popupFundo);
        };

        btnDesfazer.onclick = () => document.body.removeChild(popupFundoConfirm);

        btnContainer.append(btnDesfazer, btnConfirmarFinal);
        popupConfirm.append(mensagem, btnContainer);
        popupFundoConfirm.appendChild(popupConfirm);
        document.body.appendChild(popupFundoConfirm);

        popupFundoConfirm.addEventListener("click", e => {
            if (e.target === popupFundoConfirm) document.body.removeChild(popupFundoConfirm);
        });
    };

    botaoCancelar.onclick = () => document.body.removeChild(popupFundo);

    popup.append(titulo, estoqueInfo, botoesContainer);
    botoesAcoes.append(botaoCancelar, botaoConfirmar);
    popup.appendChild(botoesAcoes);
    popupFundo.appendChild(popup);
    document.body.appendChild(popupFundo);

    popupFundo.addEventListener("click", e => {
        if (e.target === popupFundo) document.body.removeChild(popupFundo);
    });
}
// ---------- FIM DO CÓDIGO ---------- //
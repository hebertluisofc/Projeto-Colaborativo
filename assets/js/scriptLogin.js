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
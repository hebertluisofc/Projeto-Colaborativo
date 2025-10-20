// ---------- IMPORTS FIREBASE ----------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// ---------- CONFIG FIREBASE ----------
const firebaseConfig = {
    apiKey: "AIzaSyCB44213O-GvromzmBPXwcinKvles_cHjQ",
    authDomain: "sistema-de-logistica-senai.firebaseapp.com",
    databaseURL: "https://sistema-de-logistica-senai-default-rtdb.firebaseio.com", // importante para RTDB
    projectId: "sistema-de-logistica-senai",
    storageBucket: "sistema-de-logistica-senai.appspot.com",
    messagingSenderId: "880816206545",
    appId: "1:880816206545:web:5ba5ce825e23c0fbcc8bf0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ---------- FUNÇÕES FIREBASE ----------
export function salvarEstoque(cabinetId, cellId, produto, quantidade) {
    set(ref(db, `cabinets/${cabinetId}/${cellId}`), { produto, quantidade });
}

export function ouvirEstoque(cabinetId, atualizarUI) {
    const cabinetRef = ref(db, `cabinets/${cabinetId}`);
    onValue(cabinetRef, (snapshot) => {
        const dados = snapshot.val();
        if (dados) atualizarUI(dados);
    });
}

// ---------- POPUP DE ESTOQUE ----------
export function abrirPopup(elemento) {
    const nomeProduto = elemento.dataset.product;
    let quantidadeEstoque = parseInt(elemento.dataset.amount);
    let valorAtual = 0;

    const popupFundo = document.createElement("div");
    Object.assign(popupFundo.style, {
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
    });

    const popup = document.createElement("div");
    Object.assign(popup.style, {
        background: "#fff", padding: "20px", borderRadius: "12px",
        textAlign: "center", minWidth: "300px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)", fontFamily: "Arial, sans-serif"
    });

    const titulo = document.createElement("h2");
    titulo.textContent = nomeProduto;

    const estoqueInfo = document.createElement("p");
    estoqueInfo.textContent = `Estoque atual: ${quantidadeEstoque}`;

    const valorDisplay = document.createElement("span");
    valorDisplay.textContent = valorAtual;
    Object.assign(valorDisplay.style, { margin: "0 20px", fontSize: "26px", fontWeight: "bold" });

    function atualizarPreview() {
        const final = quantidadeEstoque + valorAtual;
        estoqueInfo.textContent = `Estoque final previsto: ${final}`;

        if (valorAtual > 0) {
            valorDisplay.style.color = "#28a745"; // verde
        } else if (valorAtual < 0) {
            valorDisplay.style.color = "#dc3545"; // vermelho
        } else {
            valorDisplay.style.color = "#000"; // preto
        }
    }

    function criarBotao(texto, cor, fn) {
        const b = document.createElement("button");
        b.textContent = texto;
        Object.assign(b.style, {
            width: "50px", height: "50px", borderRadius: "50%",
            fontSize: "22px", fontWeight: "bold", border: "none",
            cursor: "pointer", backgroundColor: cor, color: "#fff", transition: "0.2s"
        });
        b.onmouseover = () => b.style.opacity = "0.8";
        b.onmouseout = () => b.style.opacity = "1";
        b.onclick = fn;
        return b;
    }

    const botaoMenos = criarBotao("−", "#dc3545", () => {
        if (quantidadeEstoque + valorAtual - 1 >= 0) {
            valorAtual--;
            valorDisplay.textContent = valorAtual;
            atualizarPreview();
        }
    });

    const botaoMenos10 = criarBotao("-10", "#dc3545", () => {
        if (quantidadeEstoque + valorAtual - 10 >= 0) {
            valorAtual -= 10;
            valorDisplay.textContent = valorAtual;
            atualizarPreview();
        }
    });

    const botaoMais = criarBotao("+", "#28a745", () => {
        valorAtual++;
        valorDisplay.textContent = valorAtual;
        atualizarPreview();
    });

    const botaoMais10 = criarBotao("+10", "#28a745", () => {
        valorAtual += 10;
        valorDisplay.textContent = valorAtual;
        atualizarPreview();
    });

    const botoesContainer = document.createElement("div");
    Object.assign(botoesContainer.style, {
        margin: "15px 0", display: "flex",
        alignItems: "center", justifyContent: "center", gap: "10px"
    });
    botoesContainer.append(botaoMenos10, botaoMenos, valorDisplay, botaoMais, botaoMais10);

    const botoesAcoes = document.createElement("div");
    Object.assign(botoesAcoes.style, {
        display: "flex", justifyContent: "space-between",
        gap: "10px", marginTop: "15px"
    });

    const botaoCancelar = document.createElement("button");
    botaoCancelar.textContent = "Cancelar";
    Object.assign(botaoCancelar.style, {
        flex: "1", padding: "10px", border: "none", borderRadius: "8px",
        backgroundColor: "#6c757d", color: "#fff", fontSize: "16px", cursor: "pointer"
    });
    botaoCancelar.onclick = () => popupFundo.remove();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.textContent = "Confirmar";
    Object.assign(botaoConfirmar.style, {
        flex: "1", padding: "10px", border: "none", borderRadius: "8px",
        backgroundColor: "#007bff", color: "#fff", fontSize: "16px", cursor: "pointer"
    });

    botaoConfirmar.onclick = () => {
        const popupFundoConfirm = document.createElement("div");
        Object.assign(popupFundoConfirm.style, {
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 1100
        });

        const popupConfirm = document.createElement("div");
        Object.assign(popupConfirm.style, {
            background: "#fff", padding: "20px", borderRadius: "12px",
            minWidth: "300px", textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)", fontFamily: "Arial, sans-serif"
        });

        const mensagem = document.createElement("p");
        if (valorAtual > 0) {
            mensagem.innerHTML = `Você vai <span style="color:#28a745;font-weight:bold">adicionar</span> ${valorAtual} unidade(s) de ${nomeProduto}.`;
        } else if (valorAtual < 0) {
            mensagem.innerHTML = `Você vai <span style="color:#dc3545;font-weight:bold">remover</span> ${-valorAtual} unidade(s) de ${nomeProduto}.`;
        } else {
            mensagem.textContent = `Nenhuma alteração será feita no estoque de ${nomeProduto}.`;
        }

        const btnContainer = document.createElement("div");
        Object.assign(btnContainer.style, {
            display: "flex", justifyContent: "space-between",
            gap: "10px", marginTop: "15px"
        });

        const btnConfirmarFinal = document.createElement("button");
        btnConfirmarFinal.textContent = "Confirmar";
        Object.assign(btnConfirmarFinal.style, {
            flex: "1", padding: "10px", border: "none", borderRadius: "8px",
            backgroundColor: "#007bff", color: "white", fontSize: "16px", cursor: "pointer"
        });

        const btnDesfazer = document.createElement("button");
        btnDesfazer.textContent = "Desfazer";
        Object.assign(btnDesfazer.style, {
            flex: "1", padding: "10px", border: "none", borderRadius: "8px",
            backgroundColor: "#dc3545", color: "white", fontSize: "16px", cursor: "pointer"
        });

        btnConfirmarFinal.onclick = () => {
            quantidadeEstoque += valorAtual;
            elemento.dataset.amount = quantidadeEstoque;
            elemento.querySelector("p").textContent = quantidadeEstoque;
            elemento.querySelector("h3").textContent = nomeProduto;
            atualizarCor(elemento, quantidadeEstoque);
            salvarEstoque(document.body.id, elemento.id, nomeProduto, quantidadeEstoque);
            popupFundoConfirm.remove();
            popupFundo.remove();
        };

        btnDesfazer.onclick = () => popupFundoConfirm.remove();

        btnContainer.append(btnDesfazer, btnConfirmarFinal);
        popupConfirm.append(mensagem, btnContainer);
        popupFundoConfirm.appendChild(popupConfirm);
        document.body.appendChild(popupFundoConfirm);
        popupFundoConfirm.addEventListener("click", e => {
            if (e.target === popupFundoConfirm) popupFundoConfirm.remove();
        });
    };

    popup.append(titulo, estoqueInfo, botoesContainer);
    botoesAcoes.append(botaoCancelar, botaoConfirmar);
    popup.appendChild(botoesAcoes);
    popupFundo.appendChild(popup);
    document.body.appendChild(popupFundo);
    popupFundo.addEventListener("click", e => { if (e.target === popupFundo) popupFundo.remove(); });
}


// ---------- COR DAS CÉLULAS ----------
function atualizarCor(celula, qtd) {
    celula.classList.remove("cellRed", "cellYellow", "cellGreen");
    if (qtd <= 10) celula.classList.add("cellRed");
    else if (qtd <= 50) celula.classList.add("cellYellow");
    else celula.classList.add("cellGreen");
}

// ---------- CARREGAR DADOS DO FIREBASE AO INICIAR ----------
document.addEventListener("DOMContentLoaded", () => {
    ouvirEstoque(document.body.id, (dados) => {
        console.log("Dados recebidos do Firebase:", dados); // debug rápido

        for (const cellId in dados) {
            const item = dados[cellId];
            const celula = document.getElementById(cellId);

            if (celula && item) {
                const quantidade = parseInt(item.quantidade, 10) || 0; // garante número
                const nomeProduto = item.produto || "ITEM";

                // Atualiza dataset
                celula.dataset.product = nomeProduto;
                celula.dataset.amount = quantidade;

                // Cria ou atualiza os elementos h3 e p
                let h3 = celula.querySelector("h3");
                if (!h3) {
                    h3 = document.createElement("h3");
                    celula.appendChild(h3);
                }
                h3.textContent = nomeProduto;

                let p = celula.querySelector("p");
                if (!p) {
                    p = document.createElement("p");
                    celula.appendChild(p);
                }
                p.textContent = quantidade;

                // Atualiza cor da célula
                atualizarCor(celula, quantidade);

                // Define onclick para abrir popup
                celula.onclick = () => abrirPopup(celula);
            }
        }
    });
});

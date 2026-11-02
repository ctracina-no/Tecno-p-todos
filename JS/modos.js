// Aplica o tema e atualiza o ícone
function aplicarTema(tema) {
    const escuro = tema === "escuro";

    document.documentElement.classList.toggle("dark", escuro);

    icone.src = escuro ? "Img/moon.png" : "Img/sun.png";
    icone.alt = escuro ? "Modo escuro" : "Modo claro";

    botao.setAttribute("aria-pressed", String(escuro));
    botao.setAttribute(
        "aria-label",
        escuro ? "Ativar modo claro" : "Ativar modo escuro"
    );
}

const botao = document.getElementById("modos");
const icone = botao.querySelector("img");

// Recupera a preferência salva pelo usuário
const temaSalvo = localStorage.getItem("tema") || "claro";


// Aplica o tema assim que o JavaScript é executado
aplicarTema(temaSalvo);

// Alterna o tema quando o usuário clica
botao.addEventListener("click", function () {
    const escuro = !document.documentElement.classList.contains("dark");

    const novoTema = escuro ? "escuro" : "claro";

    // Salva a escolha no navegador
    localStorage.setItem("tema", novoTema);

    aplicarTema(novoTema);
});

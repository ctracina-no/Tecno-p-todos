function abrirOpcoes() {
    painelOpcoes.classList.remove("translate-x-full");
    fundoOpcoes.classList.remove("opacity-0", "invisible");

    painelOpcoes.setAttribute("aria-hidden", "false");
}

function fecharOpcoes() {
    painelOpcoes.classList.add("translate-x-full");
    fundoOpcoes.classList.add("opacity-0", "invisible");

    painelOpcoes.setAttribute("aria-hidden", "true");
}

function movimentarBolinha(bolinha) {
    bolinha.classList.toggle("translate-x-0")
    bolinha.classList.toggle("translate-x-5")
}

// Aba de personalização
const botaoOpcoes = document.getElementById("opcoes");
const painelOpcoes = document.getElementById("painelOpcoes");
const fundoOpcoes = document.getElementById("fundoOpcoes");
const botaoFechar = document.getElementById("fecharOpcoes");

botaoOpcoes.addEventListener("click", abrirOpcoes);
botaoFechar.addEventListener("click", fecharOpcoes);
fundoOpcoes.addEventListener("click", fecharOpcoes);


// Seleciona o botao de alterção de tema
const alterarTema = document.getElementById("alterarTema");

alterarTema.addEventListener("click", function () {

    const escuro = !document.documentElement.classList.contains("dark");

    const novoTema = escuro ? "escuro" : "claro";

    localStorage.setItem("tema", novoTema);

    aplicarTema(novoTema);

    const bolinha = document.querySelector("#alterarTema span");

    movimentarBolinha(bolinha)

});

window.aplicarTema = aplicarTema;

// movimento da bolinha na alteração do tema
const bolinha = document.querySelector("#alterarTema span");

const temaEscuro = document.documentElement.classList.contains("dark");

if (temaEscuro) {
    bolinha.classList.remove("translate-x-0");
    bolinha.classList.add("translate-x-5");

} else {
    bolinha.classList.remove("translate-x-5");
    bolinha.classList.add("translate-x-0");
}
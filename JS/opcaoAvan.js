// Aba de personalização

const botaoOpcoes = document.getElementById("opcoes");
const painelOpcoes = document.getElementById("painelOpcoes");
const fundoOpcoes = document.getElementById("fundoOpcoes");
const botaoFechar = document.getElementById("fecharOpcoes");

// Abrir opções
function abrirOpcoes() {
    painelOpcoes.classList.remove("translate-x-full");
    fundoOpcoes.classList.remove("opacity-0", "invisible");

    painelOpcoes.setAttribute("aria-hidden", "false");
}

// Fechar opções
function fecharOpcoes() {
    painelOpcoes.classList.add("translate-x-full");
    fundoOpcoes.classList.add("opacity-0", "invisible");

    painelOpcoes.setAttribute("aria-hidden", "true");
}

// Eventos da aba de personalização
botaoOpcoes.addEventListener("click", abrirOpcoes);
botaoFechar.addEventListener("click", fecharOpcoes);
fundoOpcoes.addEventListener("click", fecharOpcoes);


// Movimento da bolinha do botão de tema
function movimentarBolinha(bolinha) {

    const temaEscuro = document.documentElement.classList.contains("dark");

    if (temaEscuro) {
        bolinha.classList.remove("translate-x-0");
        bolinha.classList.add("translate-x-5");

    } else {
        bolinha.classList.remove("translate-x-5");
        bolinha.classList.add("translate-x-0");
    }
}


// Botão de alteração de tema
const alterarTema = document.getElementById("alterarTema");

alterarTema.addEventListener("click", function () {

    const escuro = !document.documentElement.classList.contains("dark");

    const novoTema = escuro ? "escuro" : "claro";

    localStorage.setItem("tema", novoTema);

    aplicarTema(novoTema);

    const bolinha = document.querySelector("#alterarTema span");

    movimentarBolinha(bolinha);

});

// Roda de cores

//seleciona a cor da roda
const rodaCores = document.getElementById("rodaCores");

//seleciona o texto que mostra a cor
const valorCor = document.getElementById("valorCor");

//seleciona a cor em si
rodaCores.addEventListener("click", function(event) {

const area = rodaCores.getBoundingClientRect();

const centroX = area.left + area.width / 2;
const centroY = area.top + area.height / 2;

const diferencaX = event.clientX - centroX;
const diferencaY = event.clientY - centroY;

const angulo = Math.atan2(diferencaY, diferencaX);

const graus = angulo * (180 / Math.PI);

const anguloNormalizado = (graus + 360) % 360;

const tonalidade = (anguloNormalizado + 90) % 360;

const cor = `hsl(${tonalidade}, 100%, 50%)`;
const corClara = `hsl(${tonalidade}, 100%, 75%)`;
const corMedia = `hsl(${tonalidade}, 100%, 35%)`;
const corEscura = `hsl(${tonalidade}, 100%, 25%)`;

valorCor.textContent = `Cor selecionada: ${cor}`;

document.documentElement.style.setProperty("--color-tpt-azul", cor);

document.documentElement.style.setProperty("--color-tpt-azulclaro", corClara);

document.documentElement.style.setProperty("--color-tpt-meioazul", corMedia);

document.documentElement.style.setProperty("--color-tpt-azulescuro", corEscura);

})
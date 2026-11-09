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


// Botão de alteração de tema
const alterarTema = document.getElementById("alterarTema");

alterarTema.addEventListener("click", function () {

    const escuro = !document.documentElement.classList.contains("dark");

    const novoTema = escuro ? "escuro" : "claro";

    localStorage.setItem("tema", novoTema);

    aplicarTema(novoTema);
});

// Roda de cores

//seleciona a cor da roda
const rodaCores = document.getElementById("rodaCores");

//seleciona o texto que mostra a cor
const valorCor = document.getElementById("valorCor");

//Manter a cor escolhida pelo usuario
function aplicarPaleta(tonalidade) {

    const cor = `hsl(${tonalidade}, 75%, 45%)`;
    const corClara = `hsl(${tonalidade}, 50%, 87%)`;
    const corMedia = `hsl(${tonalidade}, 70%, 36%)`;
    const corEscura = `hsl(${tonalidade}, 70%, 24%)`;

    const raiz = document.documentElement;

    raiz.style.setProperty("--color-tpt-cor", cor);
    raiz.style.setProperty("--color-tpt-claro", corClara);
    raiz.style.setProperty("--color-tpt-meio", corMedia);
    raiz.style.setProperty("--color-tpt-escuro", corEscura);

    valorCor.textContent = `Cor selecionada: ${cor}`;
}

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

aplicarPaleta(tonalidade);

localStorage.setItem("tonalidade", tonalidade);

valorCor.textContent = `Cor selecionada: ${cor}`;

document.documentElement.style.setProperty("--color-tpt-cor", cor);

document.documentElement.style.setProperty("--color-tpt-claro", corClara);

document.documentElement.style.setProperty("--color-tpt-meio", corMedia);

document.documentElement.style.setProperty("--color-tpt-escuro", corEscura);
});

//Salva o tema
const tonalidadeSalva = localStorage.getItem("tonalidade");

if (tonalidadeSalva !== null) {
    aplicarPaleta(Number(tonalidadeSalva));
}
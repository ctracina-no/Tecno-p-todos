// Aba de personalização

// consts do painel de personalização
const botaoOpcoes = document.getElementById("opcoes");
const painelOpcoes = document.getElementById("painelOpcoes");
const fundoOpcoes = document.getElementById("fundoOpcoes");
const botaoFechar = document.getElementById("fecharOpcoes");

// const do botao de reset da página
const botaoResetar = document.getElementById("resetarPersonalizacao");

// consts do tamanho do texto
const tamanhoTexto = document.getElementById("tamanhoTexto");
const valorTamanhoTexto = document.getElementById("valorTamanhoTexto");

const conteudoPrincipal = document.getElementById("inicio")

// consts do espaçamento das linhas
const espacamentoLinhas = document.getElementById("espacamentoLinhas")
const valorEspacamentoLinhas = document.getElementById("valorEspacamentoLinhas")

//const para constraste
const alternarContraste = document.getElementById("alternarContraste");



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

// Botão resetar personalização 
botaoResetar.addEventListener("click", function () {

    // tema padrão = claro
    localStorage.setItem("tema", "claro")
    aplicarTema("claro");

    // Remove a cor personalizada salva
    localStorage.removeItem("tonalidade");

    // cores padrão = azul
    document.documentElement.style.removeProperty("--color-tpt-cor");
    document.documentElement.style.removeProperty("--color-tpt-claro");
    document.documentElement.style.removeProperty("--color-tpt-meio");
    document.documentElement.style.removeProperty("--color-tpt-escuro");

    valorCor.textContent = "Cor Selecionada: Nenhuma";

    // tamanho do texto padrão = 100%
    tamanhoTexto.value = 100;
    valorTamanhoTexto.textContent = "100%";
    conteudoPrincipal.style.removeProperty("--escala-texto");
    localStorage.removeItem("tamanhoTexto");

    // espaçamento das linhas padrão = 1.5
    espacamentoLinhas.value = 1.5;
    valorEspacamentoLinhas.textContent = "1,5";
    conteudoPrincipal.style.lineHeight = "1.5";
    localStorage.removeItem("espacamentoLinhas");

    // Desativar alto contraste
    document.documentElement.classList.remove("alto-contraste");
    localStorage.removeItem("altoContraste");

    alternarContraste.setAttribute("aria-pressed", "false");
    alternarContraste.setAttribute("aria-label", "Ativar alto contraste");

    const bolinhaContraste = alternarContraste.querySelector("span");

    bolinhaContraste.classList.remove("translate-x-5");
    bolinhaContraste.classList.add("translate-x-0");
});

// Roda de cores

//seleciona a cor da roda
const rodaCores = document.getElementById("rodaCores");

//seleciona o texto que mostra a cor
const valorCor = document.getElementById("valorCor");

//Manter a cor escolhida pelo usuario
function aplicarPaleta(tonalidade) {

    const cor = `hsl(${tonalidade.toFixed(2)}, 75%, 45%)`;
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
rodaCores.addEventListener("click", function (event) {

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

});

//Salva o tema
const tonalidadeSalva = localStorage.getItem("tonalidade");

if (tonalidadeSalva !== null) {
    aplicarPaleta(Number(tonalidadeSalva));
}

// Tamanho de texto
tamanhoTexto.addEventListener("input", function () {
    valorTamanhoTexto.textContent = `${tamanhoTexto.value}%`;

    const escala = Number(tamanhoTexto.value) / 100;

    conteudoPrincipal.style.setProperty("--escala-texto", escala);

    localStorage.setItem("tamanhoTexto", tamanhoTexto.value);
});

// Espaçamento das linhas
espacamentoLinhas.addEventListener("input", function () {

    const valor = Number(espacamentoLinhas.value);

    conteudoPrincipal.style.lineHeight = valor;

    valorEspacamentoLinhas.textContent = valor.toFixed(1).replace(".", ".");

    localStorage.setItem("espacamentoLinhas", espacamentoLinhas.value)
});

// Recuperar o tamanho do texto salvo
const tamanhoTextoSalvo = localStorage.getItem("tamanhoTexto");

if (tamanhoTextoSalvo !== null) {
    const valor = Number(tamanhoTextoSalvo);

    tamanhoTexto.value = valor;
    valorTamanhoTexto.textContent = `${valor}%`;

    const escala = valor / 100;
    conteudoPrincipal.style.setProperty("--escala-texto", escala);
}

// Recuperar o espaçamento das linhas salvo
const espacamentoLinhasSalvo = localStorage.getItem("espacamentoLinhas");

if (espacamentoLinhasSalvo !== null) {
    const valor = Number(espacamentoLinhasSalvo);

    espacamentoLinhas.value = valor;
    conteudoPrincipal.style.lineHeight = valor;

    valorEspacamentoLinhas.textContent = valor.toFixed(1).replace(".", ",");
}

alternarContraste.addEventListener("click", function () {

    const ativo = document.documentElement.classList.toggle("alto-contraste");

    localStorage.setItem("altoContraste", ativo ? "ativo" : "inativo");

    alternarContraste.setAttribute("aria-pressed", String(ativo));

    alternarContraste.setAttribute(
        "aria-label",
        ativo ? "Desativar alto contraste" : "Ativar alto contraste"
    );

    const bolinha = alternarContraste.querySelector("span");

    bolinha.classList.toggle("translate-x-5", ativo);
    bolinha.classList.toggle("translate-x-0", !ativo);

});

// Recuperar a preferência salva
const contrasteSalvo = localStorage.getItem("altoContraste");

const contrasteAtivo = contrasteSalvo === "ativo";

// Aplicar o estado salvo
document.documentElement.classList.toggle(
    "alto-contraste",
    contrasteAtivo
);

// Atualizar o interruptor
alternarContraste.setAttribute(
    "aria-pressed",
    String(contrasteAtivo)
);

alternarContraste.setAttribute(
    "aria-label",
    contrasteAtivo ? "Desativar alto contraste" : "Ativar alto contraste"
);

const bolinhaContraste = alternarContraste.querySelector("span");

bolinhaContraste.classList.toggle("translate-x-5", contrasteAtivo);
bolinhaContraste.classList.toggle("translate-x-0", !contrasteAtivo);
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

let lang = 'pt';
let font = 100;
let lastFocusedElement = null;
const content = {};

// Carregamento inicial com tratamento de erro
fetch('content.json')
  .then((r) => {
    if (!r.ok) throw new Error('Não foi possível carregar content.json');
    return r.json();
  })
  .then((data) => {
    content.articles = data.articles || [];
    content.sections = data.sections || [];
    render();
  })
  .catch((err) => {
    console.error(err);
    $('#inclusionGrid').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
  });

function render() {
  const sg = $('#inclusionGrid');
  const ag = $('#articleGrid');
  const icons = ['♿', '◉', '♀', '✦', '◎', '▣', '✧', '⌘'];

  sg.innerHTML = content.sections
    .map(
      (x, i) => `
      <button class="topic-card" data-section="${i}">
        <span class="topic-icon">${icons[i] || '✦'}</span>
        <strong>${x[lang + '_title']}</strong>
        <p>${x[lang + '_text']}</p>
        <span class="read-link">${lang === 'pt' ? 'Conhecer tema →' : 'Explore topic →'}</span>
      </button>`
    )
    .join('');

  ag.innerHTML = content.articles
    .map(
      (x, i) => `
      <button class="article-card" data-article="${i}">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <strong>${x[lang + '_title']}</strong>
        <span>${lang === 'pt' ? 'Abrir leitura ↗' : 'Open reading ↗'}</span>
      </button>`
    )
    .join('');

  updateLang();
}

// Delegação de eventos para os cartões (evita recriar listeners a cada render)
$('#inclusionGrid').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-section]');
  if (btn) openModal(content.sections[btn.dataset.section]);
});

$('#articleGrid').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-article]');
  if (btn) openModal(content.articles[btn.dataset.article]);
});

function openModal(item) {
  if (!item) return;
  lastFocusedElement = document.activeElement; // Salva o foco atual

  $('#modalTag').textContent = lang === 'pt' ? 'Leitura breve' : 'Short reading';
  $('#modalTitle').textContent = item[lang + '_title'];
  $('#modalText').textContent = item[lang + '_text'];

  const modal = $('#modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('.modal-close').focus();
}

function closeModal() {
  const modal = $('#modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastFocusedElement) lastFocusedElement.focus(); // Devolve o foco
}

$$('[data-close]').forEach((b) => b.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $('#modal').classList.contains('open')) closeModal();
});

function updateLang() {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  $$('[data-pt][data-en]').forEach((el) => {
    const html = el.dataset[lang];
    if (html.includes('<em>')) el.innerHTML = html;
    else el.textContent = html;
  });

  $('#lang').textContent = lang === 'pt' ? 'EN' : 'PT';
  $('#lang').setAttribute('aria-label', lang === 'pt' ? 'Switch to English' : 'Mudar para português');
  $('#contrast').textContent = lang === 'pt' ? 'Contraste' : 'Contrast';
  $('#year').textContent = new Date().getFullYear();
}

// Controles de interface e acessibilidade
$('#lang').addEventListener('click', () => {
  lang = lang === 'pt' ? 'en' : 'pt';
  if (content.articles) render();
  else updateLang();
});

$('#theme').addEventListener('click', () => document.documentElement.classList.toggle('dark-mode'));

$('#fontUp').addEventListener('click', () => {
  font = Math.min(150, font + 10);
  document.documentElement.style.setProperty('--scale', font / 100);
});

$('#fontDown').addEventListener('click', () => {
  font = Math.max(80, font - 10);
  document.documentElement.style.setProperty('--scale', font / 100);
});

$('#contrast').addEventListener('click', (e) => {
  const active = document.documentElement.classList.toggle('high-contrast');
  e.currentTarget.setAttribute('aria-pressed', String(active));
});

$('#menu').addEventListener('click', (e) => {
  const open = $('nav').classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
});

$$('nav a').forEach((a) =>
  a.addEventListener('click', () => {
    $('nav').classList.remove('open');
    $('#menu').setAttribute('aria-expanded', 'false');
  })
);

// Quiz
$$('[data-answer]').forEach((b) =>
  b.addEventListener('click', () => {
    const isCorrect = b.dataset.answer === 'no';
    const feedback = $('#quizFeedback');
    feedback.textContent = isCorrect
      ? lang === 'pt'
        ? 'Isso mesmo! Alcance não comprova veracidade. Verifique fontes e evidências.'
        : 'Correct! Reach does not prove truth. Check sources and evidence.'
      : lang === 'pt'
      ? 'Não necessariamente. Curtidas mostram interação, não a qualidade da evidência.'
      : 'Not necessarily. Likes show engagement, not the quality of evidence.';
    feedback.style.color = isCorrect ? '#087a55' : '#b65c10';
  })
);

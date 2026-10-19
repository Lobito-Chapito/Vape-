/* ===== 0. VERIFICAÇÃO DE IDADE + 1. MENSAGEM DE BOAS-VINDAS ===== */
function confirmarIdade() {
  document.getElementById("idade").classList.add("escondido");
  document.body.classList.remove("bloqueado");
  try { sessionStorage.setItem("maior18", "sim"); } catch (e) {}
  alert("Bem-vindo à CloudNine Vape Shop!");
}

function recusarIdade() {
  // Utilizador menor de idade: o conteúdo do site é substituído
  document.body.innerHTML =
    '<div style="font-family:sans-serif;text-align:center;padding:4rem 1rem;">' +
    "<h1>Acesso não permitido</h1>" +
    "<p>Este website é exclusivo para maiores de 18 anos.</p></div>";
}

function verificarIdadeInicial() {
  let jaConfirmou = false;
  try { jaConfirmou = sessionStorage.getItem("maior18") === "sim"; } catch (e) {}

  if (jaConfirmou) {
    document.getElementById("idade").classList.add("escondido");
  } else {
    document.body.classList.add("bloqueado");
  }
}

/* ===== 2. BOTÃO INTERATIVO ===== */
function mostrarMensagem() {
  alert("Obrigado pela sua visita!");
}

/* ===== 3. ALTERAR COR DE FUNDO ===== */
const coresFundo = ["#dbeafe", "#fce7f3", "#dcfce7", "#fef9c3", "#ede9fe"];
let indiceCor = 0;

function mudarCor() {
  document.body.style.backgroundColor = coresFundo[indiceCor];
  indiceCor = (indiceCor + 1) % coresFundo.length;
}

/* ===== 4. MODO ESCURO ===== */
function modoEscuro() {
  document.body.style.backgroundColor = "";
  document.body.classList.toggle("dark");

  const ativo = document.body.classList.contains("dark");
  document.getElementById("btnModoEscuro").textContent = ativo ? "☀️" : "🌙";
  try { localStorage.setItem("modoEscuroVapes", ativo); } catch (e) {}
}

function carregarModoEscuro() {
  try {
    if (localStorage.getItem("modoEscuroVapes") === "true") {
      document.body.classList.add("dark");
      document.getElementById("btnModoEscuro").textContent = "☀️";
    }
  } catch (e) {}
}

/* ===== 5. CONTADOR DE VISITAS ===== */
let visitas = 0;

function contarVisita() {
  try { visitas = Number(localStorage.getItem("visitasVapes")) || 0; } catch (e) {}
  visitas++;
  try { localStorage.setItem("visitasVapes", visitas); } catch (e) {}
  document.getElementById("contador").innerHTML = "Visitas: " + visitas;
}

/* ===== 6. DICAS (frases aleatórias) ===== */
const frases = [
  "A nicotina é viciante: se não fumas, não deves começar.",
  "Guarda sempre os líquidos longe do alcance de crianças e animais.",
  "Usa apenas carregadores e baterias recomendados pelo fabricante.",
  "Existem líquidos sem nicotina, pergunta-nos em loja.",
  "Se queres deixar de fumar, fala com o teu médico ou farmacêutico."
];
let ultimaFrase = -1;

function novaFrase() {
  let i;
  do {
    i = Math.floor(Math.random() * frases.length);
  } while (i === ultimaFrase && frases.length > 1);
  ultimaFrase = i;
  document.getElementById("frase").textContent = frases[i];
}

/* ===== MENU RESPONSIVO ===== */
function alternarMenu() {
  const menu = document.getElementById("menu");
  const botao = document.getElementById("btnMenu");
  const aberto = menu.classList.toggle("aberto");
  botao.setAttribute("aria-expanded", aberto);
}

/* ===== FORMULÁRIO DE CONTACTO ===== */
function validarFormulario(evento) {
  evento.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const feedback = document.getElementById("feedback");
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (nome === "" || mensagem === "") {
    feedback.textContent = "Por favor, preenche o nome e a mensagem.";
    feedback.className = "feedback erro";
  } else if (!emailValido) {
    feedback.textContent = "Introduz um email válido.";
    feedback.className = "feedback erro";
  } else {
    feedback.textContent = "Obrigado, " + nome + "! Entraremos em contacto em breve.";
    feedback.className = "feedback sucesso";
    evento.target.reset();
  }
}

/* ===== DETALHES DOS PRODUTOS (dados fictícios) ===== */
const produtos = {
  pod: {
    icone: "🔋",
    titulo: "Dispositivos Pod",
    descricao: "Dispositivos pequenos, leves e simples, pensados para quem procura facilidade de utilização.",
    artigos: [
      { nome: "CloudPod Mini", detalhe: "Bateria 400 mAh · carregamento USB-C", preco: "19,90 €" },
      { nome: "CloudPod Plus", detalhe: "Bateria 800 mAh · pod recarregável", preco: "29,90 €" },
      { nome: "CloudPod Pro", detalhe: "Bateria 1000 mAh · fluxo de ar regulável", preco: "39,90 €" }
    ],
    info: [
      "Não precisam de configuração: basta encher o pod e usar.",
      "Fácil de transportar e de limpar.",
      "Garantia de 12 meses contra defeitos de fabrico."
    ]
  },
  kits: {
    icone: "⚙️",
    titulo: "Kits Avançados",
    descricao: "Mods e tanques com potência e fluxo de ar ajustáveis, para utilizadores com experiência.",
    artigos: [
      { nome: "Kit Storm 80W", detalhe: "Potência ajustável · ecrã OLED", preco: "49,90 €" },
      { nome: "Kit Storm 150W", detalhe: "Duas baterias 18650 (não incluídas)", preco: "69,90 €" },
      { nome: "Tanque Nimbus", detalhe: "Capacidade 5 ml · enchimento superior", preco: "24,90 €" }
    ],
    info: [
      "Exigem conhecimentos sobre baterias e resistências.",
      "Usa sempre baterias de marcas certificadas.",
      "Pede aconselhamento em loja antes da primeira utilização."
    ]
  },
  liquidos: {
    icone: "🧪",
    titulo: "Líquidos",
    descricao: "Frascos de 10 ml e 50 ml em vários sabores, com vários níveis de nicotina ou sem nicotina.",
    artigos: [
      { nome: "Frutos Vermelhos", detalhe: "10 ml · 0, 3 ou 6 mg/ml", preco: "4,90 €" },
      { nome: "Menta Fresca", detalhe: "10 ml · 0, 3 ou 6 mg/ml", preco: "4,90 €" },
      { nome: "Tabaco Clássico", detalhe: "10 ml · 6 ou 12 mg/ml", preco: "4,90 €" },
      { nome: "Shortfill Manga", detalhe: "50 ml · sem nicotina", preco: "12,90 €" }
    ],
    info: [
      "A nicotina é uma substância viciante: escolhe o nível com aconselhamento.",
      "Guarda os frascos fechados e longe de crianças e animais.",
      "Verifica sempre o prazo de validade e a rotulagem."
    ]
  },
  acessorios: {
    icone: "🔧",
    titulo: "Acessórios",
    descricao: "Peças de substituição e acessórios para manter o teu dispositivo em bom estado.",
    artigos: [
      { nome: "Resistências (pack 5)", detalhe: "Compatíveis com a gama CloudPod", preco: "9,90 €" },
      { nome: "Carregador USB-C", detalhe: "Cabo de 1 metro", preco: "5,90 €" },
      { nome: "Estojo de proteção", detalhe: "Rígido, com compartimento extra", preco: "7,90 €" },
      { nome: "Pods de substituição (pack 3)", detalhe: "Capacidade 2 ml", preco: "8,90 €" }
    ],
    info: [
      "Troca as resistências regularmente para melhor desempenho.",
      "Não deixes a bateria a carregar sem vigilância.",
      "Usa só acessórios compatíveis com o teu modelo."
    ]
  }
};

let cartaoAberto = null;

function abrirProduto(id) {
  const p = produtos[id];
  if (!p) return;

  document.getElementById("modalIcone").textContent = p.icone;
  document.getElementById("modalTitulo").textContent = p.titulo;
  document.getElementById("modalDescricao").textContent = p.descricao;

  const lista = document.getElementById("modalArtigos");
  lista.innerHTML = "";
  p.artigos.forEach(function (a) {
    const li = document.createElement("li");
    li.innerHTML = '<div><span class="nome"></span><span class="detalhe"></span></div><span class="preco"></span>';
    li.querySelector(".nome").textContent = a.nome;
    li.querySelector(".detalhe").textContent = a.detalhe;
    li.querySelector(".preco").textContent = a.preco;
    lista.appendChild(li);
  });

  const info = document.getElementById("modalInfo");
  info.innerHTML = "";
  p.info.forEach(function (texto) {
    const li = document.createElement("li");
    li.textContent = texto;
    info.appendChild(li);
  });

  document.getElementById("modalProduto").classList.remove("escondido");
  document.body.classList.add("bloqueado");
  document.getElementById("btnFechar").focus();
}

function fecharProduto() {
  document.getElementById("modalProduto").classList.add("escondido");
  document.body.classList.remove("bloqueado");
  if (cartaoAberto) cartaoAberto.focus();
}

function ligarProdutos() {
  document.querySelectorAll(".cartao[data-produto]").forEach(function (cartao) {
    cartao.addEventListener("click", function () {
      cartaoAberto = cartao;
      abrirProduto(cartao.dataset.produto);
    });
    cartao.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        cartaoAberto = cartao;
        abrirProduto(cartao.dataset.produto);
      }
    });
  });

  document.getElementById("btnFechar").addEventListener("click", fecharProduto);
  document.getElementById("modalContacto").addEventListener("click", fecharProduto);
  document.getElementById("modalProduto").addEventListener("click", function (e) {
    if (e.target === this) fecharProduto(); // clique fora da caixa
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !document.getElementById("modalProduto").classList.contains("escondido")) {
      fecharProduto();
    }
  });
}

/* ===== LIGAR EVENTOS ===== */
document.addEventListener("DOMContentLoaded", function () {
  verificarIdadeInicial();
  carregarModoEscuro();
  contarVisita();
  novaFrase();
  ligarProdutos();

  document.getElementById("btnSim").addEventListener("click", confirmarIdade);
  document.getElementById("btnNao").addEventListener("click", recusarIdade);
  document.getElementById("btnObrigado").addEventListener("click", mostrarMensagem);
  document.getElementById("btnCor").addEventListener("click", mudarCor);
  document.getElementById("btnModoEscuro").addEventListener("click", modoEscuro);
  document.getElementById("btnFrase").addEventListener("click", novaFrase);
  document.getElementById("btnMenu").addEventListener("click", alternarMenu);
  document.getElementById("formContacto").addEventListener("submit", validarFormulario);

  document.querySelectorAll("#menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.getElementById("menu").classList.remove("aberto");
    });
  });
});
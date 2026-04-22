// ===== CLASSE (OO) =====
class Personagem {
  constructor(nome, descricao, imagem) {
    this.nome = nome;
    this.descricao = descricao;
    this.imagem = imagem;
    this.pontos = 0;
  }

  adicionarPontos(valor) {
    this.pontos += valor;
  }
}

// ===== PERSONAGENS =====
const personagens = {
  A: new Personagem(
    "Arkan (Mago)",
    "Sábio, estratégico e mestre das artes mágicas.",
    "https://cdn.pixabay.com/photo/2017/01/31/13/14/magic-2026484_1280.png"
  ),
  B: new Personagem(
    "Brutus (Guerreiro)",
    "Forte, corajoso e imbatível no combate.",
    "https://cdn.pixabay.com/photo/2013/07/12/18/20/knight-153573_1280.png"
  ),
  C: new Personagem(
    "Lyra (Arqueira)",
    "Ágil, precisa e conectada à natureza.",
    "https://cdn.pixabay.com/photo/2014/04/02/10/41/archer-304732_1280.png"
  )
};

// ===== PERGUNTAS (10) =====
const perguntas = [
  {
    pergunta: "O que você prefere fazer no tempo livre?",
    opcoes: [
      { texto: "Estudar", pontos: {A:3,B:1,C:2} },
      { texto: "Treinar", pontos: {A:1,B:3,C:2} },
      { texto: "Explorar", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "Qual sua maior qualidade?",
    opcoes: [
      { texto: "Inteligência", pontos: {A:3,B:1,C:2} },
      { texto: "Força", pontos: {A:1,B:3,C:2} },
      { texto: "Agilidade", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "Em batalha você:",
    opcoes: [
      { texto: "Planeja", pontos: {A:3,B:1,C:2} },
      { texto: "Ataca", pontos: {A:1,B:3,C:2} },
      { texto: "Observa", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "Ambiente favorito?",
    opcoes: [
      { texto: "Biblioteca", pontos: {A:3,B:1,C:2} },
      { texto: "Arena", pontos: {A:1,B:3,C:2} },
      { texto: "Floresta", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "Escolha uma arma:",
    opcoes: [
      { texto: "Cajado", pontos: {A:3,B:1,C:2} },
      { texto: "Espada", pontos: {A:1,B:3,C:2} },
      { texto: "Arco", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "Você é mais:",
    opcoes: [
      { texto: "Calmo", pontos: {A:3,B:1,C:2} },
      { texto: "Impulsivo", pontos: {A:1,B:3,C:2} },
      { texto: "Atento", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "Na equipe você é:",
    opcoes: [
      { texto: "Líder estratégico", pontos: {A:3,B:1,C:2} },
      { texto: "Protetor", pontos: {A:1,B:3,C:2} },
      { texto: "Explorador", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "O que valoriza?",
    opcoes: [
      { texto: "Conhecimento", pontos: {A:3,B:1,C:2} },
      { texto: "Coragem", pontos: {A:1,B:3,C:2} },
      { texto: "Liberdade", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "Como resolve problemas?",
    opcoes: [
      { texto: "Pensando", pontos: {A:3,B:1,C:2} },
      { texto: "Agindo", pontos: {A:1,B:3,C:2} },
      { texto: "Analisando", pontos: {A:2,B:1,C:3} }
    ]
  },
  {
    pergunta: "Seu estilo é:",
    opcoes: [
      { texto: "Intelectual", pontos: {A:3,B:1,C:2} },
      { texto: "Combativo", pontos: {A:1,B:3,C:2} },
      { texto: "Estratégico", pontos: {A:2,B:1,C:3} }
    ]
  }
];

// ===== CONTROLE =====
let perguntaAtual = 0;

// ===== EVENTOS =====
document.getElementById("btnIniciar").addEventListener("click", iniciarQuiz);
document.getElementById("btnReiniciar").addEventListener("click", reiniciar);

// ===== INICIAR =====
function iniciarQuiz() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  mostrarPergunta();
}

// ===== MOSTRAR PERGUNTA =====
function mostrarPergunta() {
  const p = perguntas[perguntaAtual];

  document.getElementById("pergunta").innerText =
    `(${perguntaAtual + 1}/10) ${p.pergunta}`;

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  p.opcoes.forEach(opcao => {
    const btn = document.createElement("button");
    btn.innerText = opcao.texto;
    btn.onclick = () => responder(opcao.pontos);
    opcoesDiv.appendChild(btn);
  });
}

// ===== RESPONDER =====
function responder(pontos) {
  for (let key in pontos) {
    personagens[key].adicionarPontos(pontos[key]);
  }

  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

// ===== RESULTADO =====
function mostrarResultado() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "block";

  let maior = Math.max(...Object.values(personagens).map(p => p.pontos));
  let vencedores = [];

  for (let key in personagens) {
    if (personagens[key].pontos === maior) {
      vencedores.push(personagens[key]);
    }
  }

  const nome = vencedores.length > 1
    ? "Empate entre: " + vencedores.map(v => v.nome).join(", ")
    : vencedores[0].nome;

  const desc = vencedores.length > 1
    ? "Você possui características de múltiplos personagens!"
    : vencedores[0].descricao;

  const img = vencedores[0].imagem;

  document.getElementById("personagemNome").innerText = nome;
  document.getElementById("personagemDesc").innerText = desc;
  document.getElementById("personagemImg").src = img;
  document.getElementById("pontuacao").innerText = "Pontuação: " + maior;
}

// ===== REINICIAR =====
function reiniciar() {
  for (let key in personagens) {
    personagens[key].pontos = 0;
  }

  perguntaAtual = 0;

  document.getElementById("resultado").style.display = "none";
  document.getElementById("inicio").style.display = "block";
}
// Buscar elementos na árvore DOM e guardar em variáveis
const btnInc = document.getElementById('btnInc');
const btnDec = document.getElementById('btnDec');
const counterDisplay = document.getElementById('counterDisplay');
const btnReset = document.getElementById('btnReset');

const inputText = document.getElementById('inputText');
const charCount = document.getElementById('charCount');

const btnAddItem = document.getElementById('btnAddItem');
const listType = document.getElementById('listType');

const messages = document.getElementById('messages');
const listsContainer = document.getElementById('listsContainer');

// Estado local
let state = {
  counter: 0,
  paragraphs: [], // array de strings
  lists: [] // array de { type: 'ul'|'ol', items: [strings] }
};

// --- LocalStorage keys
const LS_KEY = 'interactive_page_state_v1';

// --- Utilidades
function saveState() {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    // validação mínima
    if (typeof parsed === 'object' && parsed !== null) {
      state = Object.assign(state, parsed);
    }
  } catch (e) {
    console.warn('Não foi possível carregar estado do localStorage:', e);
  }
}

// Conta caracteres sem espaços (remove whitespace e conta o restante)
function countCharsExcludingSpaces(text) {
  return text.replace(/\s+/g, '').length;
}

// Atualiza visual do contador
function updateCounterDisplay() {
  counterDisplay.textContent = String(state.counter);
}

// --- Renderização de parágrafos e listas a partir do estado
function renderParagraphs() {
  messages.innerHTML = '';
  state.paragraphs.forEach((text, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'message';

    const p = document.createElement('p');
    p.textContent = text;
    wrapper.appendChild(p);

    const controls = document.createElement('div');
    controls.className = 'msg-controls';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => editParagraph(idx));
    controls.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.textContent = 'Remover';
    delBtn.addEventListener('click', () => {
      if (confirm('Remover este parágrafo?')) removeParagraph(idx);
    });
    controls.appendChild(delBtn);

    wrapper.appendChild(controls);
    messages.appendChild(wrapper);
  });

  if (state.paragraphs.length === 0) {
    // dica quando vazio
    const hint = document.createElement('small');
    hint.className = 'hint';
    hint.textContent = 'Nenhum parágrafo adicionado.';
    messages.appendChild(hint);
  }
}

function renderLists() {
  listsContainer.innerHTML = '';
  if (state.lists.length === 0) {
    const hint = document.createElement('small');
    hint.className = 'hint';
    hint.textContent = 'Nenhuma lista criada.';
    listsContainer.appendChild(hint);
    return;
  }

  state.lists.forEach((lst, listIdx) => {
    const listEl = document.createElement(lst.type);
    lst.items.forEach((itemText, itemIdx) => {
      const li = document.createElement('li');

      const spanText = document.createElement('span');
      spanText.textContent = itemText;
      spanText.style.flex = '1';
      li.appendChild(spanText);

      const controls = document.createElement('div');
      controls.className = 'li-controls';

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', () => editListItem(listIdx, itemIdx));
      controls.appendChild(editBtn);

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.textContent = 'Remover';
      delBtn.addEventListener('click', () => {
        if (confirm('Remover este item?')) removeListItem(listIdx, itemIdx);
      });
      controls.appendChild(delBtn);

      li.appendChild(controls);
      listEl.appendChild(li);
    });

    listsContainer.appendChild(listEl);
  });
}

// --- Operações em parágrafos
function addParagraph(text) {
  state.paragraphs.push(text);
  saveState();
  renderParagraphs();
}

function editParagraph(idx) {
  const current = state.paragraphs[idx];
  const novo = prompt('Editar parágrafo:', current);
  if (novo === null) return; // cancelou
  const trimmed = novo.trim();
  if (trimmed.length === 0) {
    if (confirm('Texto vazio — remover parágrafo?')) {
      removeParagraph(idx);
    }
    return;
  }
  state.paragraphs[idx] = trimmed;
  saveState();
  renderParagraphs();
}

function removeParagraph(idx) {
  state.paragraphs.splice(idx, 1);
  saveState();
  renderParagraphs();
}

// --- Operações em listas
function addListItem(type, text) {
  // encontra lista do mesmo tipo; se não existir, cria
  let lst = state.lists.find(l => l.type === type);
  if (!lst) {
    lst = { type, items: [] };
    state.lists.push(lst);
  }
  lst.items.push(text);
  saveState();
  renderLists();
}

function editListItem(listIdx, itemIdx) {
  const current = state.lists[listIdx].items[itemIdx];
  const novo = prompt('Editar item:', current);
  if (novo === null) return;
  const trimmed = novo.trim();
  if (trimmed.length === 0) {
    if (confirm('Texto vazio — remover item?')) {
      removeListItem(listIdx, itemIdx);
    }
    return;
  }
  state.lists[listIdx].items[itemIdx] = trimmed;
  saveState();
  renderLists();
}

function removeListItem(listIdx, itemIdx) {
  state.lists[listIdx].items.splice(itemIdx, 1);
  // se a lista ficou vazia, remover a lista inteira
  if (state.lists[listIdx].items.length === 0) {
    state.lists.splice(listIdx, 1);
  }
  saveState();
  renderLists();
}

// --- Eventos: Contador
btnInc.addEventListener('click', () => {
  state.counter += 1;
  updateCounterDisplay();
  saveState();
});

btnDec.addEventListener('click', () => {
  if (state.counter <= 0) {
    alert('O contador já está em zero.');
    state.counter = 0;
  } else {
    state.counter -= 1;
  }
  updateCounterDisplay();
  saveState();
});

// Reset: zera tudo com confirmação
btnReset.addEventListener('click', () => {
  if (!confirm('Deseja realmente resetar tudo?')) return;
  state = { counter: 0, paragraphs: [], lists: [] };
  saveState();
  applyStateToUI();
});

// Input textarea: contador de caracteres sem espaços e Enter adiciona parágrafo
inputText.addEventListener('input', () => {
  const n = countCharsExcludingSpaces(inputText.value);
  charCount.textContent = String(n);
});

inputText.addEventListener('keydown', (ev) => {
  // Enter sem Shift adiciona como parágrafo
  if (ev.key === 'Enter' && !ev.shiftKey) {
    ev.preventDefault();
    const text = inputText.value.trim();
    if (text.length === 0) return;
    addParagraph(text);
    inputText.value = '';
    charCount.textContent = '0';
  }
});

// Botão adicionar item: pede texto ao usuário via prompt e adiciona ao estado
btnAddItem.addEventListener('click', () => {
  const tipo = listType.value; // 'ul' ou 'ol'
  const texto = prompt('Texto do novo item:');
  if (texto === null) return; // cancelado
  const trimmed = texto.trim();
  if (trimmed.length === 0) {
    alert('Texto vazio. Item não adicionado.');
    return;
  }
  addListItem(tipo, trimmed);
});

// --- Inicialização
function applyStateToUI() {
  updateCounterDisplay();
  renderParagraphs();
  renderLists();
}

// Load state from localStorage and render
loadState();
applyStateToUI();
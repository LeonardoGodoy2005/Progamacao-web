let numeroSecreto = Math.floor(Math.random() * 20) + 1;
let tentativas = 0;
let historico = [];

function verificar() {
    let input = document.getElementById("inputNumero");
    let valor = Number(input.value);
    let mensagem = document.getElementById("mensagem");
    let lista = document.getElementById("historico");
    let tentativasTexto = document.getElementById("tentativas");

    if (valor < 1 || valor > 20 || isNaN(valor)) {
        mensagem.innerText = "Digite um número válido entre 1 e 20!";
        return;
    }

    historico.push(valor);
    tentativas++;

    let item = document.createElement("li");
    item.innerText = valor;
    lista.appendChild(item);

    if (valor > numeroSecreto) {
        mensagem.innerText = "🔽 O número secreto é MENOR!";
    } else if (valor < numeroSecreto) {
        mensagem.innerText = "🔼 O número secreto é MAIOR!";
    } else {
        mensagem.innerText = "🎉 Parabéns! Você acertou!";
    }

    tentativasTexto.innerText = "Tentativas: " + tentativas;

    input.value = "";
    input.focus();
}

function reiniciar() {
    numeroSecreto = Math.floor(Math.random() * 20) + 1;
    tentativas = 0;
    historico = [];

    document.getElementById("mensagem").innerText = "Novo jogo iniciado!";
    document.getElementById("tentativas").innerText = "";
    document.getElementById("historico").innerHTML = "";

    document.getElementById("inputNumero").value = "";
    document.getElementById("inputNumero").focus();
}
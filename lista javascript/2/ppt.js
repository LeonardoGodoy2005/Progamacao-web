let opcoes = ["pedra", "papel", "tesoura"];

function jogar(escolhaUsuario) {
    let indice = Math.floor(Math.random() * 3);
    let escolhaComputador = opcoes[indice];

    let resultadoTexto = `
        Você escolheu: ${escolhaUsuario} <br>
        Computador escolheu: ${escolhaComputador} <br>
    `;

    if (escolhaUsuario === escolhaComputador) {
        resultadoTexto += "🤝 Empate!";
    } else if (
        (escolhaUsuario === "pedra" && escolhaComputador === "tesoura") ||
        (escolhaUsuario === "papel" && escolhaComputador === "pedra") ||
        (escolhaUsuario === "tesoura" && escolhaComputador === "papel")
    ) {
        resultadoTexto += "🎉 Você venceu!";
    } else {
        resultadoTexto += "💻 Computador venceu!";
    }

    document.getElementById("resultado").innerHTML = resultadoTexto;
}
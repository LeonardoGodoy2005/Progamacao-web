function calcular() {
    let n = Number(document.getElementById("n").value);

    let termo = 0;
    let soma = 0;
    let serie = "";

    for (let i = 1; i <= n; i++) {
        termo = termo * 10 + 1;
        soma += termo;

        serie += termo;
        if (i < n) {
            serie += " + ";
        }
    }


    let somaFormatada = soma.toLocaleString('pt-BR');

    document.getElementById("resultado").innerHTML =
        serie + "<br><br>A soma é: " + somaFormatada;
}
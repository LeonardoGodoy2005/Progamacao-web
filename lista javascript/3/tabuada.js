function gerar() {
    let numero = Number(document.getElementById("numero").value);
    let resultado = document.getElementById("resultado");

    let tabela = "<table>";
    tabela += "<tr><th>Multiplicação</th><th>Resultado</th></tr>";

    for (let i = 1; i <= 10; i++) {
        tabela += `<tr>
            <td>${numero} x ${i}</td>
            <td>${numero * i}</td>
        </tr>`;
    }

    tabela += "</table>";

    resultado.innerHTML = tabela;
}
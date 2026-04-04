const precos = {
    gasolina: 6.69,
    etanol: 4.30,
    diesel: 6.03
};

const atualizarValor = () => {
    const tipo = document.getElementById("combustivel").value;
    const litros = parseFloat(document.getElementById("litros").value);
    const resultado = document.getElementById("resultado");

    if (!tipo) {
        resultado.textContent = "Selecione um combustível";
        resultado.classList.add("erro");
        return;
    }

    if (isNaN(litros) || litros <= 0) {
        resultado.textContent = "Digite uma quantidade válida";
        resultado.classList.add("erro");
        return;
    }

    resultado.classList.remove("erro");

    const preco = precos[tipo];
    calcularAbastecimento(preco, litros);
};

const calcularAbastecimento = (preco, litros) => {
    const total = preco * litros;
    document.getElementById("resultado").textContent = formatarMoeda(total);
};

const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

document.getElementById("combustivel")
    .addEventListener("change", atualizarValor);

document.getElementById("litros")
    .addEventListener("input", atualizarValor);

document.getElementById("litros")
    .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            atualizarValor();
        }
    });
// Função para calcular o resultado dentro de um elemento "ingredientes"
function calcularResultado(ingredientesDiv) {
    const quantidadeUsada = parseFloat(ingredientesDiv.querySelector('input:nth-child(2)').value) || 0;
    const precoPacote = parseFloat(ingredientesDiv.querySelector('input:nth-child(3)').value) || 0;
    const quantidadePacote = parseFloat(ingredientesDiv.querySelector('input:nth-child(4)').value) || 1;

    const resultado = (quantidadeUsada * precoPacote) / quantidadePacote;
    ingredientesDiv.querySelector('.resultado').textContent = `Resultado: R$ ${resultado.toFixed(2)}`;

    calcularCustoTotal();
}

// Função para calcular o custo total
function calcularCustoTotal() {
    let total = 0;
    document.querySelectorAll('.resultado').forEach(resultadoDiv => {
        total += parseFloat(resultadoDiv.textContent.split('R$ ')[1]) || 0;
    });
    document.querySelector('.total').textContent = total.toFixed(2);

    calcularValoresFinais();
}

// Função para calcular os valores finais
function calcularValoresFinais() {
    const custoTotal = parseFloat(document.querySelector('.total').textContent) || 0;
    const rendimento = parseFloat(document.querySelector('.produto input:nth-child(2)').value) || 1;

    const custoUnitario = custoTotal / rendimento;
    const vendaUnitaria = custoUnitario * 1.66;
    const vendaReceita = custoTotal * 1.66;

    // Atualizando os elementos HTML com os novos valores
    document.querySelector('.custo-unitario').textContent = `R$ ${custoUnitario.toFixed(2)}`;
    document.querySelector('.venda-unitaria').textContent = `R$ ${vendaUnitaria.toFixed(2)}`;
    document.querySelector('.venda-receita').textContent = `R$ ${vendaReceita.toFixed(2)}`;
}


// Função para adicionar event listener aos formulários de ingredientes
function adicionarEventListeners() {
    document.querySelectorAll('.ingredientes').forEach(ingredientesDiv => {
        ingredientesDiv.addEventListener('input', function() {
            calcularResultado(ingredientesDiv);
        });
    });
}

// Event listener para adicionar novo ingrediente
document.querySelector('.novoIngrediente').addEventListener('click', function() {
    const ingredientesDiv = document.querySelector('.ingredientes').cloneNode(true);
    ingredientesDiv.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    ingredientesDiv.querySelector('.resultado').textContent = '';
    document.querySelector('.ingredientes-duplicado').appendChild(ingredientesDiv);
    adicionarEventListeners();
});

// Adicionar event listeners aos formulários de ingredientes existentes
adicionarEventListeners();

// Reset button
document.querySelector('.reset').addEventListener('click', function() {
    location.reload();
});

// Share button
document.querySelector('.compartilhar').addEventListener('click', function() {
    const nomeProduto = document.querySelector('.produto input').value;
    const total = document.querySelector('.total').textContent;
    const texto = `${nomeProduto} - ${total}`;
    navigator.clipboard.writeText(texto).then(function() {
        alert('Dados copiados para a área de transferência.');
    }, function() {
        alert('Erro ao copiar dados.');
    });
});

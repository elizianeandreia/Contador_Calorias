const Contadorcalorias = document.getElementById('contador-calorias');
const orcamentoNumberInput = document.getElementById('orcamento');
const listaEntrada = document.getElementById('lista-entrada');
const addEntradaButton = document.getElementById('add-entrada');
const limparButton = document.getElementById('limpar');
const saida = document.getElementById('saida');

let Erro = false;

function limparInputString(str) {
    return str.replace(/[+\s]/g, '');
}

function isInvalidInput(str) {
    return isNaN(str) || Number(str) < 0;
}

function addEntrada() {
    const targetInputContainer = document.querySelector(`#${listaEntrada.value} .input-container`);
    const entradaNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    
    const HTMLString = `
        <label for="${listaEntrada.value}-${entradaNumber}-nome">Entrada ${entradaNumber} Nome</label>
        <input type="text" id="${listaEntrada.value}-${entradaNumber}-nome" placeholder="Nome" required>
        <label for="${listaEntrada.value}-${entradaNumber}-calorias">Entrada ${entradaNumber} Calorias</label>
        <input type="number" min="0" id="${listaEntrada.value}-${entradaNumber}-calorias" placeholder="Calorias" required>
    `;

    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculadorCalorias(e) {
    e.preventDefault();
    Erro = false;

    const cafedamanhaCalorias = getCaloriasFromInputs(document.querySelectorAll("#cafedamanha input[type='number']"));
    const almocoCalorias = getCaloriasFromInputs(document.querySelectorAll("#almoco input[type='number']"));
    const jantarCalorias = getCaloriasFromInputs(document.querySelectorAll("#jantar input[type='number']"));
    const aperitivosCalorias = getCaloriasFromInputs(document.querySelectorAll("#aperitivos input[type='number']"));
    const exerciciosCalorias = getCaloriasFromInputs(document.querySelectorAll("#exercicios input[type='number']"));
    const orcamentoCalorias = Number(orcamentoNumberInput.value);

    if (Erro) return;

    const consumidaCalorias = cafedamanhaCalorias + almocoCalorias + jantarCalorias + aperitivosCalorias;
    const restanteCalorias = orcamentoCalorias - consumidaCalorias + exerciciosCalorias;
    const superavitOuDeficit = restanteCalorias < 0 ? 'Superavit' : 'Deficit';

    saida.innerHTML = `
        <span class="${superavitOuDeficit.toLowerCase()}">${Math.abs(restanteCalorias)} Calorias ${superavitOuDeficit}</span>
        <hr>
        <p>${orcamentoCalorias} Calorias Orçadas</p>
        <p>${consumidaCalorias} Calorias Consumidas</p>
        <p>${exerciciosCalorias} Calorias Queimadas</p>
    `;
    saida.classList.remove('hide');
}

function getCaloriasFromInputs(lista) {
    let calorias = 0;

    for (const item of lista) {
        const atualValor = limparInputString(item.value);

        if (isInvalidInput(atualValor)) {
            alert(`Entrada inválida: ${item.value}`);
            Erro = true;
            return 0;
        }
        calorias += Number(atualValor);
    }
    return calorias;
}

function limparForm() {
    document.querySelectorAll('.input-container').forEach(container => container.innerHTML = '');
    orcamentoNumberInput.value = '';
    saida.innerText = '';
    saida.classList.add('hide');
}

addEntradaButton.addEventListener("click", addEntrada);
Contadorcalorias.addEventListener("submit", calculadorCalorias);
limparButton.addEventListener("click", limparForm);
const contadorCalorias = document.getElementById('contador-calorias');
const orcamentoNumberInput = document.getElementById('orcamento');
const listaEntrada = document.getElementById('lista-entrada');
const addEntradaButton = document.getElementById('add-entrada');
const limparButton = document.getElementById('limpar');
const saida = document.getElementById('saida');
let Erro = false;

function limparInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntrada() {
  const targetInputContainer = document.querySelector(`#${listaEntrada.value} .input-container`);
  const entradaNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${listaEntrada.value}-${entradaNumber}-nome">Entrada ${entradaNumber} Nome</label>
  <input type="text" id="${listaEntrada.value}-${entradaNumber}-nome" placeholder="Nome" />
  <label for="${listaEntrada.value}-${entradaNumber}-calorias">Entrada ${entradaNumber} Calorias</label>
  <input
    type="number"
    min="0"
    id="${listaEntrada.value}-${entradaNumber}-calorias"
    placeholder="Calorias"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calcularCalorias(e) {
  e.preventDefault();
  Erro = false;

  const cafedamanhaNumberInputs = document.querySelectorAll("#cafedamanha input[type='number']");
  const almocoNumberInputs = document.querySelectorAll("#almoco input[type='number']");
  const jantarNumberInputs = document.querySelectorAll("#jantar input[type='number']");
  const aperitivosNumberInputs = document.querySelectorAll("#aperitivos input[type='number']");
  const exerciciosNumberInputs = document.querySelectorAll("#exercicios input[type='number']");

  const cafedamanhaCalorias = getCaloriasFromInputs(cafedamanhaNumberInputs);
  const almocoCalorias = getCaloriasFromInputs(almocoNumberInputs);
  const jantarCalorias = getCaloriasFromInputs(jantarNumberInputs);
  const aperitivosCalorias = getCaloriasFromInputs(aperitivosNumberInputs);
  const exerciciosCalorias = getCaloriasFromInputs(exerciciosNumberInputs);
  const orcamentoCalorias = getCaloriasFromInputs([orcamentoNumberInput]);

  if (Erro) {
    return;
  }

  const consumidaCalorias = cafedamanhaCalorias + almocoCalorias + jantarCalorias + aperitivosCalorias;
  const restanteCalorias = orcamentoCalorias - consumidaCalorias + exerciciosCalorias;
  const superavitOuDeficit = restanteCalorias < 0 ? 'Superavit' : 'Deficit';
  saida.innerHTML = `
  <span class="${superavitOuDeficit.toLowerCase()}">${Math.abs(restanteCalorias)} Caloria(s) ${superavitOuDeficit}</span>
  <hr>
  <p>${orcamentoCalorias} Calorias Orçadas</p>
  <p>${consumidaCalorias} Calorias Consumidas</p>
  <p>${exerciciosCalorias} Calorias Queimadas</p>
  `;

  saida.classList.remove('hide');
}

function getCaloriasFromInputs(list) {
  let calorias = 0;

  for (const item of list) {
    const currVal = limparInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Entrada Inválida: ${invalidInputMatch[0]}`);
      Erro = true;
      return null;
    }
    calorias += Number(currVal);
  }
  return calorias;
}

function limparForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  orcamentoNumberInput.value = '';
  saida.innerText = '';
  saida.classList.add('hide');
}

addEntradaButton.addEventListener("click", addEntrada);
contadorCalorias.addEventListener("submit", calcularCalorias);
limparButton.addEventListener("click", limparForm);

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
  const entradaNumber = targetInputContainer.querySelectorAll('.entrada-item').length + 1;

  const HTMLString = `
    <div class="entrada-item flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700" for="${listaEntrada.value}-${entradaNumber}-nome">
          <span class="inline-flex items-center gap-1">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.121 17.804A9 9 0 1117.803 5.12 9 9 0 015.12 17.804z"></path>
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Nome da Entrada ${entradaNumber}
          </span>
        </label>
        <input type="text" id="${listaEntrada.value}-${entradaNumber}-nome"
          class="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Ex: Maçã" />
      </div>

      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700" for="${listaEntrada.value}-${entradaNumber}-calorias">
          <span class="inline-flex items-center gap-1">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 8c-1.657 0-3 1.343-3 3v5h6v-5c0-1.657-1.343-3-3-3z"></path>
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5 21h14a2 2 0 002-2v-4a6 6 0 00-6-6H9a6 6 0 00-6 6v4a2 2 0 002 2z"></path>
            </svg>
            Calorias
          </span>
        </label>
        <input type="number" min="0" id="${listaEntrada.value}-${entradaNumber}-calorias"
          class="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Ex: 100" />
      </div>
    </div>
  `;

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

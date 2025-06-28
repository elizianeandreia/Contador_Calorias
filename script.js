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

  const icones = {
    cafedamanha: "🍳",
    almoco: "🍛",
    jantar: "🍽️",
    aperitivos: "🍿",
    exercicios: "🏃‍♂️"
  };

  const icone = icones[listaEntrada.value] || "➕";

  const HTMLString = `
    <div class="entrada-item flex flex-col sm:flex-row sm:items-end gap-4 mb-4 border-b pb-4 relative group">
      <span class="absolute top-0 right-0 hidden group-hover:block">
        <button type="button" class="text-red-500 hover:text-red-700 text-sm remove-entrada">✖</button>
      </span>
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700" for="${listaEntrada.value}-${entradaNumber}-nome">
          ${icone} Nome da Entrada ${entradaNumber}
        </label>
        <input type="text" id="${listaEntrada.value}-${entradaNumber}-nome"
          class="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Ex: Banana" />
      </div>

      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700" for="${listaEntrada.value}-${entradaNumber}-calorias">
          🔥 Calorias
        </label>
        <input type="number" min="0" id="${listaEntrada.value}-${entradaNumber}-calorias"
          class="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Ex: 120" />
      </div>
    </div>
  `;

  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);

  const botoesRemover = targetInputContainer.querySelectorAll('.remove-entrada');
  botoesRemover.forEach(btn => {
    btn.onclick = () => {
      btn.closest('.entrada-item').remove();
    };
  });
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

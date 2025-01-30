const Contadorcalorias =document.getElementById('contador-calorias');
const orcamentoNumeroInput = document.getElementById('orcamento');
const listaEntrada = document.getElementById('lista-entrada');
const addEntradaButton = document.getElementById('add-entrada');
const limparButton = document.getElementById('limpar');
const saida = document.getElementById('saida');

let Erro =false;

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
        <input type="text" id="${listaEntrada.value}-${entradaNumber}-nome" placeholder="Nome">
        <label for="${listaEntrada.value}-${entradaNumber}-calorias">Entrada ${entradaNumber} Calorias</label>
        <input type="number" min="0" id="${listaEntrada.value}-${entradaNumber}-calorias" placeholder="Calorias">
    `;

    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}


function calculadorCalorias (e){
e.preventDefault();
Erro =false;

const cafedamanhaNumberInputs = document.querySelectorAll();
const almocoNumberInputs =document.querySelectorAll();
const jantarNumberInputs =document.querySelectorAll();
const aperitivosNumberInputs = document.querySelectorAll();
const exerciciosNumberInputs =document.querySelectorAll();

const cafedamanhaCalorias = getCaloriasFromInputs();
const almocoCalorias =getCaloriasFromInputs();
const jantarCalorias =getCaloriasFromInputs();
const aperitivosCalorias =getCaloriasFromInputs();
const exerciciosCalorias =getCaloriasFromInputs();
const orcamentoCalorias =getCaloriasFromInputs();

if(Erro){
    return;
}
}

function getCaloriasFromInputs(){

}

function limparForm(){

}

addEntradaButton.addEventListener("click", addEntrada);
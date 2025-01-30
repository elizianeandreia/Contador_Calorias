const Contadorcalorias =document.getElementById('contador-calorias');
const orcamentoNumeroInput = document.getElementById('orcamento');
const listaEntrada = document.getElementById('lista-entrada');
const addEntradaButton = document.getElementById('add-entrada');
const limparButton = document.getElementById('limpar');
const saida = document.getElementById('saida');

let Erro =false;

const limparInputString(str){
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}

function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

 function addEntrada() {
    const targetInputContainer =document.querySelector(listaEntrada);
    const entradaNumber = targetInputContainer.querySelectorAll();
    const HTMLString =`
    <label></label>
    <input>
    <label></label>
    <input>
    `

}

function calculadorCalorias (){

}

function getCaloriasFromInput(){

}

function limparForm(){
    
}
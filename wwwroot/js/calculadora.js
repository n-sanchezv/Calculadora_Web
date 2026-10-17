const pantalla = document.getElementById('pantalla');
const pantallaPrevia = document.getElementById('pantalla-previa');

function agregar(valor) {
    if (pantalla.value === 'Error' || pantalla.value === 'No se puede dividir entre cero') {
        pantalla.value = '';
    }
    pantalla.value += valor;
    calcularTiempoReal();
}

function limpiar() {
    pantalla.value = '';
    pantallaPrevia.innerText = '';
}

function borrarUltimo() {
    if (pantalla.value !== 'Error' && pantalla.value !== 'No se puede dividir entre cero') {
        pantalla.value = pantalla.value.trimEnd().slice(0, -1);
        calcularTiempoReal();
    } else {
        limpiar();
    }
}

function calcularTiempoReal() {
    try {
        let expresion = pantalla.value.trim();
        if (expresion === '') {
            pantallaPrevia.innerText = '';
            return;
        }
        let resultado = Function('"use strict";return (' + expresion + ')')();

        if (!isFinite(resultado)) {
            pantallaPrevia.innerText = "División por cero";
        } else if (resultado !== undefined && !isNaN(resultado)) {
            pantallaPrevia.innerText = "= " + resultado;
        }
    } catch (e) {
        pantallaPrevia.innerText = '';
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        agregar(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        agregar(' ' + key + ' ');
    } else if (key === 'Enter') {
        event.preventDefault();
        document.getElementById('calcForm').submit();
    } else if (key === 'Backspace') {
        borrarUltimo();
    } else if (key === 'Escape' || key === 'Delete') {
        limpiar();
    }
});

window.onload = function () {
    if (pantalla && pantalla.value !== "" && pantalla.value !== "Error" && pantalla.value !== "No se puede dividir entre cero") {
        if (pantallaPrevia) pantallaPrevia.innerText = "";
    }
};
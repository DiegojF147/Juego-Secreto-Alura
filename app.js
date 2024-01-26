// Variables globales para el juego
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 100;

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

// Función para verificar el intento del usuario
function verificarIntento() {
  // Obtener el número ingresado por el usuario desde el elemento con id "valorUsuario"
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  // Verificar si el número ingresado es igual al número secreto
  if (numeroDeUsuario === numeroSecreto) {
    // Mostrar mensaje de acierto y cantidad de intentos
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentos} ${intentos === 1 ? "vez" : "veces"}`
    );
    // Habilitar el botón de reiniciar
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    // Verificar si se agotaron los 10 intentos permitidos
    if (intentos === 10) {
      // Mostrar mensaje de agotamiento de intentos y revelar el número secreto
      asignarTextoElemento(
        "p",
        `Lo siento, has agotado tus 10 intentos. El número secreto era ${numeroSecreto}!`
      );
      // Deshabilitar el botón de verificar
      document.getElementById("verificar").setAttribute("disabled", "true");
    } else {
      // Verificar si el número ingresado es mayor o menor al número secreto
      if (numeroDeUsuario > numeroSecreto) {
        asignarTextoElemento("p", "El número secreto es menor");
      } else {
        asignarTextoElemento("p", "El número secreto es mayor");
      }
      // Incrementar el número de intentos y limpiar la caja de entrada
      if (intentos < 10) {
        intentos++;
        limpiarCaja();
      }
    }
    // Habilitar el botón de reiniciar
    document.getElementById("reiniciar").removeAttribute("disabled");
  }

  return;
}

// Función para limpiar la caja de entrada
function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

// Función para generar un número secreto único
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  // Verificar si se han sorteado todos los números posibles
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
  } else {
    // Verificar si el número generado ya está en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      // Agregar el número generado a la lista y devolverlo
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
  // Establecer el título y el mensaje inicial
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  // Generar un nuevo número secreto y reiniciar el contador de intentos
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

// Función para reiniciar el juego
function reiniciarJuego() {
  // Limpiar la caja de entrada
  limpiarCaja();
  // Establecer las condiciones iniciales del juego
  condicionesIniciales();
  // Deshabilitar el botón de reiniciar
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

// Establecer las condiciones iniciales del juego al cargar la página
condicionesIniciales();

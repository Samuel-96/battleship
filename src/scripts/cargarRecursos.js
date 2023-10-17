import GitLogo from "../assets/github-logo.png";
import ShipIcon from "../assets/battleship-icon.png"

function cargarImagenes(){
    const logoGithub = document.querySelector("#logo-github");
    logoGithub.src = GitLogo;

    const logoBattleship1 = document.querySelector("#battleship-logo1");
    const logoBattleship2 = document.querySelector("#battleship-logo2");
    logoBattleship1.src = ShipIcon;
    logoBattleship2.src = ShipIcon;
}

let puedeColocar = true;
let contBarcos = 0;
function cargarTableros(tablero) {
    const tableroJugador = document.querySelector(".tablero-jugador");
  
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const celda = document.createElement("div");
        celda.classList.add("celda");
        celda.dataset.fila = i;
        celda.dataset.columna = j;
        celda.textContent = "□";
  
        celda.addEventListener("click", function (e) {
            eventoClick(tablero, e);
        });

        tableroJugador.appendChild(celda);
      }
    }
  }

  function eventoClick(tablero, e){
    const barcos = ["acorazado", "destructor", "submarino", "patrullero"];
    const tamBarco = obtenerTamañoBarco(barcos[contBarcos]);
    const fila = parseInt(e.target.dataset.fila);
    const columna = parseInt(e.target.dataset.columna);
  
    console.log(fila + " " + columna);
    
    //fase de colocacion de barcos
    if(puedeColocar){
        tablero.colocarBarcos([fila, columna], barcos[contBarcos]);
        for (let i = 0; i < tamBarco; i++) {
            
            const celda = document.querySelector(
              `[data-fila="${fila}"][data-columna="${columna + i}"]`
            );
            celda.textContent = "X";
          }
    
          contBarcos++;
          tablero.mostrarTablero();
        if(contBarcos >= 4){
            puedeColocar = false;
        }
    }
  }

  function obtenerTamañoBarco(nombreBarco) {
  switch (nombreBarco) {
    case "acorazado":
      return 4;
    case "destructor":
      return 4;
    case "submarino":
      return 3;
    case "patrullero":
      return 2;
    default:
      return 0; // Valor por defecto en caso de que el nombre del barco no sea válido
  }
}

export {cargarImagenes, cargarTableros};
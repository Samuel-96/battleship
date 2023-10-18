import GitLogo from "../assets/github-logo.png";
import ShipIcon from "../assets/battleship-icon.png"
import PunteroImpacto from "../assets/puntero.png";

function cargarImagenes(){
    const logoGithub = document.querySelector("#logo-github");
    logoGithub.src = GitLogo;

    const logoBattleship1 = document.querySelector("#battleship-logo1");
    const logoBattleship2 = document.querySelector("#battleship-logo2");
    logoBattleship1.src = ShipIcon;
    logoBattleship2.src = ShipIcon;
}

function cambiarCursores(){
  const celdas = document.querySelectorAll(".celda");
  celdas.forEach(celda => {
    if(celda.parentElement.classList.value === "tablero-jugador"){
      celda.style.cursor = "not-allowed";
    }
    celda.style.cursor = "cursor";
  }); 
}


function cargarTableros(tablero) {
    document.querySelector("#info-partida").textContent = "Coloca tu acorazado";
    const tableroJugador = document.querySelector(".tablero-jugador");
    const tableroCpu = document.querySelector(".tablero-cpu");

    if(tablero.jugador){
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const celda = document.createElement("div");
          celda.classList.add("celda");
          celda.dataset.fila = i;
          celda.dataset.columna = j;
          tableroJugador.appendChild(celda);
        }
      }
    }

    if(!tablero.jugador){
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const celda = document.createElement("div");
          celda.classList.add("celda");
          celda.dataset.fila = i;
          celda.dataset.columna = j;
          tableroCpu.appendChild(celda);
        }
      }
    }
    
  }

export {cargarImagenes, cargarTableros, cambiarCursores};
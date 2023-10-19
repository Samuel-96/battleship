import { activarOverlay, activarCursorCpu, desactivarCursor } from "./cargarRecursos";
import Water from "../assets/water.png"

let puedeAtacarJugador = true;
const infoColocacion = document.querySelector("#info-partida");

function eventosCeldas(tableroJugador, tableroCpu){
    
    const celdas = document.querySelectorAll(".celda")
    celdas.forEach(celda => {
            //Si tenemos las celdas del jugador le ponemos el evento de colocar barcos
            if(celda.parentElement.classList.value === "tablero-jugador"){
                
                celda.addEventListener("click", function (e) {
                    eventoColocarBarcos(tableroJugador, e);      
                });
            } 
            //si no ponemos el evento de atacar al tablero rival
            else {
                celda.addEventListener("click", function (e) {

                    atacarCpu(tableroCpu, e); //ataco a la cpu                  
                    if(puedeAtacarJugador)
                    {
                        if(tableroCpu.barcosEliminados() || tableroJugador.barcosEliminados())
                        {
                            infoColocacion.textContent = "FIN DE PARTIDA"
                            return;
                        }
                        atacarJugador(tableroJugador); //nos atacaan
                    }

                    if(tableroCpu.barcosEliminados() || tableroJugador.barcosEliminados())
                    {
                        infoColocacion.textContent = "FIN DE PARTIDA"
                        return;
                    }
                    
                });
            }
            
        })
     
}

let contBarcos = 0;
let puedeColocar = true;
let haColocado = false;

function eventoColocarBarcos(tablero, e){
    const barcos = ["acorazado", "destructor", "submarino", "patrullero"];
    const limites = [5, 5, 6, 7];
    const tamBarco = obtenerTamañoBarco(barcos[contBarcos]);
    const fila = parseInt(e.target.dataset.fila);
    const columna = parseInt(e.target.dataset.columna);
    const infoColocacion = document.querySelector("#info-partida");

    //fase de colocacion de barcos
    if(puedeColocar)
    {
        //comprobamos la celda
        if(tablero.comprobarCelda(fila,columna))
        {
            if(tablero.comprobarCelda(fila,columna+3))
            {
                //colocamos el barco en tantas casillas como longitud tenga el barco
                tablero.colocarBarcos([fila, columna], barcos[contBarcos]);
                for (let i = 0; i < tamBarco; i++) {
                    
                    const celda = document.querySelector(
                        `[data-fila="${fila}"][data-columna="${columna + i}"]`
                    );
                    //comprobamos los limites de columnas, si se ha pasado es que no ha colocado
                    if(columna >= limites[contBarcos]){
                        infoColocacion.textContent = "No se puede colocar ahí, inténtalo de nuevo "
                        haColocado = false;
                        
                    } 
                    //si ha colocado el barco 
                    else {
                        infoColocacion.textContent = "Coloca tu " + barcos[contBarcos+1];
                        haColocado = true;
                        celda.textContent = "X";
                    }
                    
                }

                if(haColocado){
                    contBarcos++;
                }
                    

                if(contBarcos >= 4){
                    puedeColocar = false;
                    infoColocacion.textContent = "Comienza la batalla";
                    setTimeout(() => {
                        infoColocacion.textContent = "Turno del jugador";

                    }, "1000");                  
                    activarOverlay();
                    activarCursorCpu();
                    return true;
                }
            }
        }
        
    } 

}

function colocarBarcosCpu(tablero){
    let cont = 0, fila, columna;
    const barcos = ["acorazado", "destructor", "submarino", "patrullero"];
    const tableroCpu = document.querySelector(".tablero-cpu");

    for(let i = 0; i < 4; i++)
    {
        let tam = obtenerTamañoBarco(barcos[cont]);
        switch(cont)
        {
            case 0: 
                fila = Math.floor(Math.random()*2);
                columna = Math.floor(Math.random()*5);

                tablero.colocarBarcos([fila, columna], barcos[cont]);

                fila = fila.toString();
                columna = columna.toString();
                
                //tablero.mostrarTablero();

                for (let i = 0; i < tam; i++) {
        
                    const celda = tableroCpu.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
                    
                    celda.textContent = "X"
                    columna++;
                }

                break;

            case 1: 
                fila = Math.floor(Math.random() * 2) + 2;
                columna = Math.floor(Math.random()*5);

                tablero.colocarBarcos([fila, columna], barcos[cont]);

                fila = fila.toString();
                columna = columna.toString();

                
                //tablero.mostrarTablero();

                for (let i = 0; i < tam; i++) {
        
                    const celda = tableroCpu.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
                    
                    celda.textContent = "X"
                    columna++;
                }

                break;

            case 2: 
            
                fila = Math.floor(Math.random() * 2) + 4;
                columna = Math.floor(Math.random()*5);

                tablero.colocarBarcos([fila, columna], barcos[cont]);

                fila = fila.toString();
                columna = columna.toString();

                
                //tablero.mostrarTablero();

                for (let i = 0; i < tam; i++) {
                    const celda = tableroCpu.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
                    celda.textContent = "X"
                    columna++;
                }                    
                break;

            case 3: 
                
                fila = Math.floor(Math.random() * 2) + 6;
                columna = Math.floor(Math.random()*5);

                tablero.colocarBarcos([fila, columna], barcos[cont]);

                fila = fila.toString();
                columna = columna.toString();

                
                //tablero.mostrarTablero();

                for (let i = 0; i < tam; i++) {
                    const celda = tableroCpu.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
                    celda.textContent = "X"
                    columna++;
                }

                break;
                
        }
        cont++;
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

let coordenadasAtacadas = [];
let celdaAtacada = false;
function atacarCpu(tablero, e){
    activarCursorCpu();
    const fila = parseInt(e.target.dataset.fila);
    const columna = parseInt(e.target.dataset.columna);
    const infoPartida = document.querySelector("#info-partida");
    
    const tableroCpu = document.querySelector(".tablero-cpu");
    const celda = tableroCpu.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);

    let celdaAtacada = false;
    coordenadasAtacadas.forEach(coordenada => {
        if(coordenada[0] === fila && coordenada[1] === columna){
            celdaAtacada = true;
            puedeAtacarJugador = false;
        }
    })

    if(!celdaAtacada)
    {
        if(!tablero.comprobarCelda(fila,columna)){
            tablero.recibirAtaque([fila,columna]);
            infoPartida.textContent = "Posición [" + fila + "," + columna + "] atacada" + ". Barco tocado";
            celda.style.backgroundColor = "#db4c1a";
            
        } else {
            celda.style.background = "#1aabdb"
            infoPartida.textContent = "Posición [" + fila + "," + columna + "] atacada" + ". FALLO";
        }
        
        puedeAtacarJugador = true;
        desactivarCursor();
        coordenadasAtacadas.push([fila,columna])
    }
}

let coordenadasAtacadasJugador = [];

function atacarJugador(tablero) {
    const infoPartida = document.querySelector("#info-partida");
    infoPartida.textContent = "ATACANDO AL JUGADOR"
    
    let fila, columna;

    do {
        fila = Math.floor(Math.random() * 8);
        columna = Math.floor(Math.random() * 8);
    } while (coordenadasAtacadasJugador.some(coordenada => coordenada[0] === fila && coordenada[1] === columna));

    coordenadasAtacadasJugador.push([fila, columna]);

    const tableroJugador = document.querySelector(".tablero-jugador");
    const celda = tableroJugador.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);

    setTimeout(() => {
        if (!tablero.comprobarCelda(fila, columna)) {
            tablero.recibirAtaque([fila, columna]);
            celda.style.backgroundColor = "#db4c1a";
        } else {
            celda.style.background = "#1aabdb";
        }

        activarCursorCpu();
        infoPartida.textContent = "TURNO DEL JUGADOR"
    }, 1600); // Retraso de 2 segundos (2000 milisegundos)
    
}


  export {eventosCeldas, colocarBarcosCpu};
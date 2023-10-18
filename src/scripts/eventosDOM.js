import { cambiarCursores } from "./cargarRecursos";

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
                    atacarCpu(tableroCpu, e);
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
            //colocamos el barco en tantas casillas como longitud tenga el barco
            tablero.colocarBarcos([fila, columna], barcos[contBarcos]);
            for (let i = 0; i < tamBarco; i++) {
                
                const celda = document.querySelector(
                    `[data-fila="${fila}"][data-columna="${columna + i}"]`
                );
                //comprobamos los limites de columnas, si se ha pasado es que no ha colocado
                if(columna >= limites[contBarcos]){
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
                cambiarCursores();
                return true;
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
    const fila = parseInt(e.target.dataset.fila);
    const columna = parseInt(e.target.dataset.columna);
    
    const tableroCpu = document.querySelector(".tablero-cpu");
    const celda = tableroCpu.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);

    coordenadasAtacadas.forEach(coordenada => {
        if(coordenada[0] === fila && coordenada[1] === columna){
            console.log("ya has atacado ahi");
            celdaAtacada = true;
            return;
        } else {
            celdaAtacada = false;
        }
    })

    if(!celdaAtacada)
    {
        if(!tablero.comprobarCelda(fila,columna)){
            console.log("tocado")
            //realizar ataque
            tablero.recibirAtaque([fila,columna]);
        }
        coordenadasAtacadas.push([fila,columna])
    }
    
    console.log(coordenadasAtacadas)
}

  export {eventosCeldas, colocarBarcosCpu};
class Barco
{
    constructor(nombre, tam, estaHundido)
    {
        this.nombre = nombre;
        this.tam = tam;
        this.numImpactos = 0;
        this.estaHundido = estaHundido;
        this.coordenadas = []
    }

    hit(){
        this.numImpactos++;
        if(this.numImpactos >= this.tam){
            this.estaHundido = true;
            this.numImpactos = this.tam;
            return;
        } 
    }
}
class Tablero
{
    constructor()
    {
        this.tablero = this.crearTablero();
        this.coleccionBarcos = [];
    }

    crearTablero(){
        const tablero = 
        [
            ["□ ", "⬜ ","□ ", "□ ", "□ ", "□ ","□ ", "□ "],
            ["□ ", "□ ","⬜ ", "□ ", "□ ", "□ ","□ ", "□ "],
            ["□ ", "□ ","□ ", "⬜ ", "□ ", "□ ","□ ", "□ "],
            ["□ ", "□ ","□ ", "□ ", "⬜ ", "□ ","□ ", "□ "],
            ["□ ", "□ ","□ ", "□ ", "□ ", "⬜ ","□ ", "□ "],
            ["□ ", "□ ","□ ", "□ ", "□ ", "□ ","⬜ ", "□ "],
            ["□ ", "□ ","□ ", "□ ", "□ ", "□ ","□ ", "⬜ "],
            ["⬜ ", "□ ","□ ", "□ ", "□ ", "□ ","□ ", "□ "],
        ];
        return tablero;
    }

    mostrarTablero(){
        for (let i = 0; i < this.tablero.length; i++) {
            let fila = "";
            for (let j = 0; j < this.tablero[i].length; j++) {
              fila += this.tablero[i][j] + " ";
            }
            console.log(fila);
        }
        console.log("-----------------------");
        console.log("-----------------------");
        console.log("-----------------------");
    }
    
    colocarBarcos(coordenadas, barco){
        //en funcion del barco pasado, se crea un barco con sus respectivas propiedades
        barco = barco.toLowerCase();
        switch(barco)
        {
            case "acorazado": 
                const acorazado = new Barco("Acorazado", 4, false); 
                acorazado.coordenadas.push([coordenadas[0],coordenadas[1]+0])
                acorazado.coordenadas.push([coordenadas[0],coordenadas[1]+1])
                acorazado.coordenadas.push([coordenadas[0],coordenadas[1]+2])
                acorazado.coordenadas.push([coordenadas[0],coordenadas[1]+3])
                this.tablero[coordenadas[0]][coordenadas[1]] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+1] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+2] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+3] = "🚢";
                this.coleccionBarcos.push(acorazado);
                break;

            case "destructor": 
                const destructor = new Barco("Destructor", 4, false); 
                destructor.coordenadas.push([coordenadas[0],coordenadas[1]+0])
                destructor.coordenadas.push([coordenadas[0],coordenadas[1]+1])
                destructor.coordenadas.push([coordenadas[0],coordenadas[1]+2])
                destructor.coordenadas.push([coordenadas[0],coordenadas[1]+3])
                this.tablero[coordenadas[0]][coordenadas[1]] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+1] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+2] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+3] = "🚢";
                this.coleccionBarcos.push(destructor);
                break;

            case "submarino": 
                const submarino = new Barco("Submarino", 3, false); 
                submarino.coordenadas.push([coordenadas[0],coordenadas[1]+0])
                submarino.coordenadas.push([coordenadas[0],coordenadas[1]+1])
                submarino.coordenadas.push([coordenadas[0],coordenadas[1]+2])
                this.tablero[coordenadas[0]][coordenadas[1]] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+1] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+2] = "🚢";
                this.coleccionBarcos.push(submarino);
                break;

            case "patrullero": 
                const patrullero = new Barco("Patrullero", 2, false);
                patrullero.coordenadas.push([coordenadas[0],coordenadas[1]+0])
                patrullero.coordenadas.push([coordenadas[0],coordenadas[1]+1])
                this.tablero[coordenadas[0]][coordenadas[1]] = "🚢";
                this.tablero[coordenadas[0]][coordenadas[1]+1] = "🚢";
                this.coleccionBarcos.push(patrullero);
                break;
        }
    }
    
    recibirAtaque(coordenadas){
        console.log(coordenadas);
        let barcoImpactado = false;
    
        this.coleccionBarcos.forEach((barco, index) => {
            barco.coordenadas.forEach(coordenada => {
                if (coordenada[0] === coordenadas[0] && coordenada[1] === coordenadas[1]) {
                    barco.hit();
                    if(barco.estaHundido){
                        //console.log("hundido el " + barco.nombre)
                        this.coleccionBarcos.splice(index, 1);
                    }
                    this.tablero[coordenadas[0]][coordenadas[1]] = "X";
                    barcoImpactado = true;
                    console.log(barco.numImpactos);
                }
            });
        });
    
        if (!barcoImpactado) {
            this.tablero[coordenadas[0]][coordenadas[1]] = "f"; // No hay barco, es "agua"
        }
    }
}

export {Barco, Tablero};
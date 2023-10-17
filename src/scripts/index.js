import "../styles/style.css";
import {cargarImagenes, cargarTableros} from "./cargarRecursos.js";
import { Barco, Tablero } from "./objects";

const tableroJugador = new Tablero();
const tableroCpu = new Tablero();

cargarImagenes();
cargarTableros(tableroJugador);
/*
const tablero = new Tablero();
tablero.mostrarTablero();
tablero.colocarBarcos([0,0], "acorazado")
tablero.mostrarTablero();
*/
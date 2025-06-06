    //funciones para arrastrar las fichas al tablero

function permitirSoltar(event) {
    event.preventDefault();         //esto es necesario para que funcione el soltar
}
function arrastrar(event) {
    event.dataTransfer.setData("text", event.target.id);   //guardo el id de lo que estoy arrastrando
}
function soltar(event) {
    event.preventDefault();

    var datos = event.dataTransfer.getData("text");
    var ficha = document.getElementById(datos);

    var celda = event.target;
    if (!celda.classList.contains("caja")) {
        celda = celda.parentElement;
    }

    //solo dejo poner ficha si la celda esta vacia 
    if (celda.children.length === 0) {
        celda.appendChild(ficha);           //pongo la ficha en la celda
        ficha.setAttribute("draggable", "false");         //ya no se puede mover
        ficha.removeAttribute("ondragstart");             //quito el evento de arrastre del html
        revisarGanador();                   //mira si alguien gano
    } else {
        alert("Esta casilla ya esta ocupada usa otra");  //mensaje por si intentan usar una celda ocupada
    }
}


function revisarGanador() {
    var celdas = document.querySelectorAll('.tablero .caja');     //traigo todas las celdas del tablero (son 9)

            //array con lo que tiene cada celda (X, O o nada)
    var tablero = Array.from(celdas).map(function(celda) {
        if (celda.children.length > 0) {
            var idFicha = celda.children[0].id;  //saco el id de la ficha ,
            if (idFicha.startsWith("cruz")) {
                return "X";
            } else if (idFicha.startsWith("circulo")) {
                return "O";
            }
        }
        return ""; 
    });

    //lista de como se puede ganar suponiendo 3 celdas que hacen linea osea para darle como una coordenada
    var combinaciones = [
        [0, 1, 2], // fila de arriba
        [3, 4, 5], // fila del medio
        [6, 7, 8], // fila de abajo
        [0, 3, 6], // columna izquierda
        [1, 4, 7], // columna del medio
        [2, 5, 8], // columna derecha
        [0, 4, 8], // diagonal principal
        [2, 4, 6]  // diagonal al reves
    ];


            //revisa cada combinacion a ver si hay 3 iguales
    for (var i = 0; i < combinaciones.length; i++) {
        var [a, b, c] = combinaciones[i]; 
        
        if (tablero[a] !== "" && tablero[a] === tablero[b] && tablero[b] === tablero[c]) { //miro si las 3 posiciones no estan vacias y son iguales para determinar al ganadoor

                    //muestro quien gano
            alert(" EL Jugador " + tablero[a] + " ha ganado ");
            location.reload();       //se recarga la pagina despues de cerrar el mensaje del ganador para jugar otra vez
            return true;             //fin de la funcion por que encuentra un ganador
        }
    }

    var empate = tablero.every(function(valor) {  //se mira si todas las celdas estan llenas y no hay ganador
        return valor !== "";
    });
    if (empate) {
        alert("Empate");
        location.reload();          //reinicio el juego si hay empate
    }
}



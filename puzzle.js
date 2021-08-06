// Es un arreglo que voy a modificar más adelante, no influye si es una const o let. Igual me permite cambiar los datos
const arrPuzzle = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15]
// Elijo esta cuadrícula que va tener un dato constante, nunca va cambiar 
const cuadriculaPuzzle = document.querySelector('.cuadrilla');
const detalles =  {
    tiempo: 0,
    movimientos: 0
}


const botonComenzar = document.querySelector('.detalles__boton');
// Cuando el contenido esté listo quiero pintar los datos en el arreglo
document.addEventListener('DOMContentLoaded', () => {
    pintarElementos ()

    botonComenzar.addEventListener('click', () => {
        desordenarArreglo ()
    })
})

// En una función para luego reutilizar con el nuevo arreglo con los datos intercambiados
function pintarElementos () {
    arrPuzzle.forEach(elemento => {
        const bloquePuzzle = document.createElement('button')
        bloquePuzzle.textContent = elemento
        bloquePuzzle.classList.add('cuadrilla__bloque')
        cuadriculaPuzzle.appendChild(bloquePuzzle)
        // Si el elemento es igual a 0 (la casilla vacía), entonces quiero colocar estilos diferentes, y no quiero que se muestre el número en la casilla, por eso igualo a un string
        if (elemento === 0) {
            bloquePuzzle.classList.add('cuadrilla__bloque--activo')
            bloquePuzzle.textContent = ''
        }
    })
    // Este elemento que estoy cambiando es el que luego voy a utilizar para añadir eventos. Es necesario colocarlo después de pintar los datos porque se va a actualizar con el arreglo modificado y no quiero que se pierda el accionar en cada uno. De otra forma quedaría un elemento padre, el primero y solo a ese podría generar acciones
    accionarCuadricula(document.querySelectorAll('.cuadrilla__bloque'))
}


// Quiero tomar el index de cada bloque dentro del arreglo para luego intercambiarlo por el que tiene la cifra de 0 y así sucesivamente, no obstante si no se encuentra cercano al cero haciendo matemáticamente una suma y resta, entonces no quiero que apliques la formula de reemplazo.
function accionarCuadricula(bloquesCuadricula) {
    // Utilizo el bloque de cuadrícula que le paso por parámetro. Esto porque ya tenía una un código hecho y me generaba errores. No podía hacer acciones en los elementos modificados, porque tomaba referencia solo del original y no los nuevos.
    bloquesCuadricula.forEach(bloquePuzzle => {
        bloquePuzzle.addEventListener('click', (elemento) => {
            // Combierto a dígitos ya que luego lo utilzo encontrar mi indexClicado dentro de mi arreglo principal
            const valorBloquePuzzle = parseInt(elemento.target.textContent)

            // Necesito el index de mi posición 0 para saber qué elementos se encuentran cerca y así poder generar acciones
            const indexPuzzle = arrPuzzle.findIndex(arrItem => {
                return arrItem === 0
            })
            
            // Si hago click sobre el elemento quiero que me tomes el index de ese elemento, no sus dígitos que pueden ser diferentes, sino su index. De esta forma los comparo matemáticamente, el valor pueder ser 100, eso no me importa saberlo
            const indexClick = arrPuzzle.findIndex(arrItem => {
                return arrItem === valorBloquePuzzle
            })

            // Con esta validación matemática me doy cuenta si el index clicado, está en los alredores de mi index de referencia === 0
            let reemplazarElemento;
            if (indexClick + 1 === indexPuzzle ||
                indexClick - 1 === indexPuzzle ||
                indexClick + 4 === indexPuzzle ||
                indexClick - 4 === indexPuzzle ) {
                    // Si los elementos se encuentran dentro del margen correcto para moverlos, entonces mi variable reemplazar va ser 0, sino se define automáticamente como undefined, no importa si colo else para "false"
                    reemplazarElemento = true
                    detalles.movimientos += 1
                }
            
            // Reemplazo cada uno de los datos dentro del arreglo, el 0 por el elemento clicado y el clicado por el valor de 0. Como 0 tiene estilos css de acuerdo a su valor, hará el efecto de cambio de color y movimiento.
            if (reemplazarElemento) {
                arrPuzzle[indexClick] = 0
                arrPuzzle[indexPuzzle] = valorBloquePuzzle
                resetearCuadricula ()
                pintarElementos()
                gameDetails()
               
            }

        })
    })
}

            
// Esto es un formula para resetear los contenidos generados dentro del la cuadricula contenedora, de otro forma se generan muchos puzzles, y no se borran los anteriores; a diferencia de "React", quitan ese dolor de cabeza.
function resetearCuadricula () {
    while(cuadriculaPuzzle.firstElementChild) {
        cuadriculaPuzzle.removeChild(cuadriculaPuzzle.firstElementChild)
    }        
}

function gameDetails () {
    // Quiero comparar el arreglo con un contador de números que luego acumulo una suma y comparo con el arreglo modificado
    let contador = 0
    let respuesta = []
    for (let i = 0; i < arrPuzzle.length - 1; i++) {
        contador++
        respuesta.push(contador === arrPuzzle[i])
    }
    const arrRespuesta = respuesta.every(res => {
        return res === true
    })

    // Si las respuestas están en el orden del contador, salta una alerta.
    mostrarMovimientos()
    arrRespuesta ? alert('Te felicito, has completado el juego correctamente.') : null


}

// Boton para desordenar el arreglo.
function desordenarArreglo () {
    arrPuzzle.sort(((a,b) => {
        return Math.random()-0.5
    }))
    resetearCuadricula()
    pintarElementos()

    detalles.movimientos = 0
    mostrarMovimientos ()
}

function mostrarMovimientos () {
    document.querySelector('.detalles__movimientos').textContent = detalles.movimientos
}
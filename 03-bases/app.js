const {crearArchivo} = require('./multiplicar/multiplicar')

let base = 20;


crearArchivo(base)
.then( archivo => console.log(`Archivo creado: ${ archivo }`))
.catch( err => console.log( err ))
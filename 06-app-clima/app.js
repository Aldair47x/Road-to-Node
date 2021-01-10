
const { getLugar } = require('./lugar/lugar');

const argv = require('yargs').options({

    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

const encodeUrl = encodeURI(argv.direccion);



// console.log(argv.direccion);



getLugar(encodeUrl)
.then(resp => console.log(resp))
.catch(e => console.log(e))









const { getLugar } = require('./lugar/lugar');
const { getClima } = require('./clima/clima');

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
.then(resp => {
    const {lat, lon} = resp;
    getClima(lat, lon).then(r => {

        console.log(`La temperatura de la ciudad ${argv.direccion} es: `,r);
    }).catch(e => console.log(e));

})
.catch(e => console.log(e))








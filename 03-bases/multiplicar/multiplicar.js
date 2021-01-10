const fs = require('fs')


const crearArchivo = async (base) => {

    if(!Number(base)){
        throw new Error(`No existe una base para crear la tabla`)
    }
    let data = '';
    for (let index = 1; index <= 30; index++) {
        data += ` ${base} * ${index} = ${base * index} \n`;
    }
    
    fs.writeFile(`tablas/table-${base}.txt`, data, (err) => {
    
        if(err) throw err;
    
        console.log('The file has been saved!')
    })

}


module.exports = {
    crearArchivo
}



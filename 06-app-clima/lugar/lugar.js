const axios = require('axios')

const getLugar =  ( direccion ) => {

    const instance = axios.create({
        baseURL: `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${direccion}`,
        headers: {
            'x-rapidapi-key': 'f6e5d92685msh59deb4b258ffe8cp12abe1jsnd10f359e3d36'
        }
    });

    const respuestaPromesa = instance.get()
    .then( resp => {
        const { lat, lon, name } = resp.data.location;
        // console.log(lugar)
        if(!lat || !lon || !name) {
            throw new Error("No se encontraron los parametros para esa dirección ");
        } else {
            
            return {
                lat,
                lon,
                name
            }
        }
        
    })
    .catch( err => console.log(err));

    return respuestaPromesa;
}

module.exports = {
    getLugar
}
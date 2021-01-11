const axios = require('axios');


const apiKey = "f1fee41184b348ce41ba5acdf09f9f4e";
const getClima = async (lat, lon) => {

    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

    if(!resp){
        throw new Error ('No se encontraron datos del clima');
    }
    
    const {temp} = resp.data.main;

    return temp
}

module.exports = {
    getClima
}
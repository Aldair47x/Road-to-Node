const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const textMensaje = document.querySelector('#textMensaje');
const btnEnviar = document.querySelector('#btnEnviar');



const socket = io();

socket.on('connect', ()=> {
    console.log('Conectado ')
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})

socket.on('disconnect', ()=> {
    console.log('Desconectado del servidor ')
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})

btnEnviar.addEventListener( 'click', () => {
    const mensaje = textMensaje.value;
    
    socket.emit('enviar-mensaje', mensaje, (id) => {
        console.log('Desde el servidor', id);
    });
})

socket.on('enviar-mensaje', (msg) => {
    console.log(msg)
})
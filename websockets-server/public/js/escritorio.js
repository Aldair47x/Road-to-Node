// referencias html

const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('#small');
const lblTicket1 = document.querySelector('#small1');
const divAlerta = document.querySelector('#alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search );


if( !searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio ');
}

const escritorio = searchParams.get('escritorio');

lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

var siguienteTicket = '';
var enCola = '';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;
    socket.on('estado-tickets', (ticket) => {
        
        const { numero } = ticket.tickets.shift();
        siguienteTicket = numero;
        enCola = ticket.tickets.length;
        lblTicket1.innerText = "Ticket "+ siguienteTicket;
        lblPendientes.innerText = enCola;
        return;

    })

    socket.on('ultimo-ticket', (ultimoTicket) => {
        console.log("por aqui", ultimoTicket, siguienteTicket, enCola)
        if(ultimoTicket == siguienteTicket){
            lblTicket1.innerText = "No hay más tickets por atender";
            return
            
        } else {
            lblTicket1.innerText = siguienteTicket;
            lblPendientes.innerText = enCola;
        }   
        // lblNuevoTicket.innerText = "Ticket "+ ultimoTicket;
    })

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});


// socket.on('enviar-mensaje', (payload) => {
//     console.log( payload )
// })


btnAtender.addEventListener( 'click', () => {

    // const mensaje = txtMensaje.value;
    // const payload = {
    //     mensaje,
    //     id: '123ABC',
    //     fecha: new Date().getTime()
    // }

    
    
    socket.emit('atender-ticket', { escritorio }, ( {ok, ticket, msg} ) => {
        if(!ok){
            divAlerta.divAlerta.style.display = '';
            lblTicket.innerText = "Nadie. ";
        } else {
            lblTicket.innerText = "Ticket "+ ticket.numero;
            siguienteTicket = siguienteTicket + 1;
            enCola =  enCola - 1;

        }


    });

    

});

console.log('Escritorio HTML');
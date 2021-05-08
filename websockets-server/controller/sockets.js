

const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);


    socket.emit('ultimo-ticket', ticketControl.ultimo );

    socket.emit('estado-tickets', ticketControl );


    socket.on('disconnect',  ()=> {
        console.log('Cliente desconectado', socket.id)
    })

    socket.on('siguiente-ticket', (payload, callback) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        
        // socket.broadcast.emit('enviar-mensaje', payload);
    })

    socket.on('atender-ticket', ({escritorio}, callback) => {

        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio '
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        socket.emit('ultimo-ticket', ticketControl.ultimo + 1 );
        
        if(!ticket){
            return callback({
                ok: false,
                msg: 'No hay tickets pendientes  '
            });
        } else {
            return callback({
                ok: true,
                ticket
            });
        }
        // console.log(payload);
        // socket.broadcast.emit('enviar-mensaje', payload);
    })
}


module.exports = {
    socketController
}
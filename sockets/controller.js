// Server

const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    console.log(`Cliente conectado ${ socket.id }`);

    socket.emit('last-ticket', ticketControl.lastTicket);
    socket.emit('current-status', ticketControl.lastAttendedTickets);
    socket.emit('pending-tickets', ticketControl.tickets.length);
    
    socket.on('new-ticket', (payload, callback) => {
        const lastTicket = ticketControl.newTicket();
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        callback(lastTicket);
    });

    socket.on('attend-ticket', ({ desktop }, callback) => {
        
        if (!desktop) { 
            callback({
                ok: false,
                msg: 'El escritorio es obligatorio!'
            })
        }

        const ticket = ticketControl.attendTicket( desktop );

        socket.broadcast.emit('current-status', ticketControl.lastAttendedTickets);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);


        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'No hay tickets pendientes 🤞'
            })
        }else {
            callback({
                ok: true,
                ticket
            })
        }

    })
}

module.exports = { socketController }
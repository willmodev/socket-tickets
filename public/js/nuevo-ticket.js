//Cliente

//Referencias al HTML

const btnNewTicket = document.querySelector('button');
const lblNewTicket = document.querySelector('#lblNewTicket');
 
const socket = io();



socket.on('connect', () => {
    console.log('Conectado 😀');
    btnNewTicket.disabled = false;
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor 😞');
    btnNewTicket.disabled = true;

})

socket.on('last-ticket', (payload) => {
    generateText(payload);
})


btnNewTicket.addEventListener('click', () => {
    socket.emit('new-ticket', null, (res) => {
        generateText(res);
    })
})

function generateText( ticket ) {
    lblNewTicket.innerHTML = `Ticket #${ ticket }`;
}

socket.emit()
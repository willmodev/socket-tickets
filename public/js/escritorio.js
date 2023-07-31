//cliente

//Referencias al HTML

const lblDesktop = document.querySelector('h1');
const btnNextTicket = document.querySelector('button');
const lblAttendingTo = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

// socket.io
const socket = io();

const searchParams = new URLSearchParams( window.location.search );

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('desktop');

lblDesktop.innerHTML += ` #${ desktop }`;



socket.on('pending-tickets', (payload) => {
    console.log(payload);
    lblPending.innerText = payload;
    
})


btnNextTicket.addEventListener('click', () => {
   
    socket.emit('attend-ticket', { desktop }, ({ ok, msg, ticket }) => {
        
        
        if(!ok) {
            divAlert.style.display = 'block';
            divAlert.innerHTML = msg;
            return lblAttendingTo.innerHTML = 'Ninguno 😀';
        }

        lblAttendingTo.innerHTML = `ticket #${ ticket.number }`;
        
    })
})


// Cliente\

// Referencias al HTML

const lblTicket1 = document.querySelector('#lblTicket1');
const lblDesktop1 = document.querySelector('#lblDesktop1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblDesktop2 = document.querySelector('#lblDesktop2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblDesktop3 = document.querySelector('#lblDesktop3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblDesktop4 = document.querySelector('#lblDesktop4');



const socket = io();


socket.on('current-status', (payload) => {
    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    lblTicket1.innerText = `Ticket #${ ticket1.number }`; 
    lblDesktop1.innerText = `Desktop #${ ticket1.desktop }`;
    lblTicket2.innerText = `Ticket #${ ticket2.number }`; 
    lblDesktop2.innerText = `Desktop #${ ticket2.desktop }`;
    lblTicket3.innerText = `Ticket #${ ticket3.number }`; 
    lblDesktop3.innerText = `Desktop #${ ticket3.desktop }`;
    lblTicket4.innerText = `Ticket #${ ticket4.number }`; 
    lblDesktop4.innerText = `Desktop #${ ticket4.desktop }`;
});
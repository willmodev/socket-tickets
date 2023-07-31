const fs = require('node:fs');
const path = require('node:path');

class Ticket {

    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}


class TicketControl {

    constructor() {
        this.lastTicket = 0;
        this.currentDay = new Date().getDate();
        this.tickets = [];
        this.lastAttendedTickets = [];


        this.init();
    }


    get toJson() {
        return {
            lastTicket: this.lastTicket,
            currentDay: this.currentDay,
            tickets: this.tickets,
            lastAttendedTickets: this.lastAttendedTickets,
        }
    }

    init() {
        
        try {
            const { lastTicket, currentDay, tickets, lastAttendedTickets } = require('../db/tickets.json');
            
            if (currentDay === this.currentDay) {
                this.tickets = tickets;
                this.lastTicket = lastTicket;
                this.lastAttendedTickets = lastAttendedTickets;
            }else {
                this.save();
            }
        } catch (error) {
            console.error('Error al cargar tickets.json:', error.message);
        }

    }

    save() {
        const dbPath = path.join( __dirname, '../db/tickets.json' );
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    newTicket() {
        this.lastTicket += 1;
        
        this.tickets.push( new Ticket(this.lastTicket, null) );

        this.save();

        return this.lastTicket;

    }

    attendTicket( desktop ) {

        if (this.tickets.length === 0) return null;

        const ticket = this.tickets.shift(); // Delete first ticket of the list
        ticket.desktop = desktop;

        this.lastAttendedTickets.unshift( ticket ); 

        if( this.lastAttendedTickets.length > 4 ) {
            this.lastAttendedTickets.splice(-1,1);
        }

        this.save();

        return ticket;

    }

}

module.exports = TicketControl;
function sortTickets(ticketParams, sortingCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            [this.destination, this.price, this.status] =
                [destination, price, status];
        }
    }

    let tickets = [];

    for (const line of ticketParams) {
        [destination, price, status] = line.split('|');

        let ticket = new Ticket(destination, +price, status);
        tickets.push(ticket);
    }

    tickets.sort(function (t1, t2) {
        switch (sortingCriteria) {
            case 'destination':
                return t1.destination.localeCompare(t2.destination);
            case 'price':
                return t1.price - t2.price;
            case 'status':
                return t1.status.localeCompare(t2.status);
        }
    });

    return tickets;
}
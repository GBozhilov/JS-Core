function printPrice([movie, day]) {
    movie = movie.toLowerCase();
    let price;
    if (movie === 'the godfather') {
        switch (day.toLowerCase()) {
            case 'monday':
                price = 12;
                break;
            case 'tuesday':
                price = 10;
                break;
            case 'wednesday':
                price = 15;
                break;
            case 'thursday':
                price = 12.50;
                break;
            case 'friday':
                price = 15;
                break;
            case 'saturday':
                price = 25;
                break;
            case 'sunday':
                price = 30;
                break;
            default:
                price = 'error';
                break;
        }
    } else if (movie === "schindler's list") {
        switch (day.toLowerCase()) {
            case 'monday':
            case 'tuesday':
            case 'wednesday':
            case 'thursday':
            case 'friday':
                price = 8.50;
                break;
            case 'saturday':
            case 'sunday':
                price = 15;
                break;
            default:
                price = 'error';
                break;
        }
    } else if (movie === 'casablanca') {
        switch (day.toLowerCase()) {
            case 'monday':
            case 'tuesday':
            case 'wednesday':
            case 'thursday':
            case 'friday':
                price = 8;
                break;
            case 'saturday':
            case 'sunday':
                price = 10;
                break;
            default:
                price = 'error';
                break;
        }
    } else if (movie === 'the wizard of oz') {
        switch (day.toLowerCase()) {
            case 'monday':
            case 'tuesday':
            case 'wednesday':
            case 'thursday':
            case 'friday':
                price = 10;
                break;
            case 'saturday':
            case 'sunday':
                price = 15;
                break;
            default:
                price = 'error';
                break;
        }
    } else {
        price = 'error';
    }

    console.log(price);
}

printPrice(['The Godfather', 'Friday']);
printPrice(['casablanca', 'sunday']);
printPrice(["Schindler's LIST", 'monday']);
printPrice(['Wrong', 'everyday']);
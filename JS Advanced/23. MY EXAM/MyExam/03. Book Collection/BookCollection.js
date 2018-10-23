class BookCollection {
    constructor(shelfGenre = '', room, shelfCapacity) {
        this.shelfGenre = shelfGenre;
        this.shelf = [];
        this.room = room;
        this.shelfCapacity = shelfCapacity;
    }

    get shelfCapacity() {
        return this._shelfCapacity;
    }

    get room() {
        return this._room;
    }

    set room(roomName) {
        if (roomName !== "livingRoom" && roomName !== "bedRoom" && roomName !== "closet")
            throw new Error(`"Cannot have book shelf in ${roomName}"`);

        this._room = roomName;
    }

    set shelfCapacity(capacity) {
        if (capacity < 0 || !Number.isInteger(capacity))
            throw new Error("Cannot have book shelf in " + this.room);

        this._shelfCapacity = capacity;
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    addBook(bookName, bookAuthor, genre = '') {
        if (bookName === '' || bookAuthor === '')
            throw new Error("Cannot add book with empty name or author");

        if (this.shelf.length === this.shelfCapacity)
            this.shelf.shift();

        this.shelf.push({bookName, bookAuthor, genre});

        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        return this;
    }

    toString() {
        if (!this.shelf.length)
            return "It's an empty shelf";

        return `"${this.shelfGenre}" shelf in ${this.room} contains:\n`
            + this.shelf
                .map(b => `\uD83D\uDCD6 "${b.bookName}" - ${b.bookAuthor}`)
                .join('\n');
    }

    throwAwayBook(bookName) {
        this.shelf = this.shelf
            .filter(b => b.bookName !== bookName);
    }

    showBooks(genre) {
        return `Results for search "${genre}":\n`
            + this.shelf
                .filter(b => b.genre === genre)
                .map(b => `\uD83D\uDCD6 ${b.bookAuthor} - "${b.bookName}"`)
                .join('\n');
    }
}

let livingRoom = new BookCollection("Programming", "livingRoom", 5)
    .addBook("Introduction to Programming with C#", "ZSvetlin Nakov")
    .addBook("Introduction to Programming with Java", "Svetlin Nakov")
    .addBook("Programming for .NET Framework", "Svetlin Nakov");
console.log(livingRoom.toString());
console.log();
livingRoom.throwAwayBook("Introduction to Programming with Java");
console.log(livingRoom.toString());
console.log();
let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
bedRoom.addBook("John Adams", "David McCullough", "history");
bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
bedRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
bedRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");
console.log("Shelf's capacity: " + bedRoom.shelfCondition);
console.log(bedRoom.showBooks("history"));
console.log();
let garden = new BookCollection("Programming", "garden");
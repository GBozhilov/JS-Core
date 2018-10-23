class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(id) {
        let pattern = /^[\d]{6}$/;

        if (!pattern.test(id)) {
            throw new TypeError('Client ID must be a 6-digit number');
        }

        this._clientId = id;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        let pattern = /^[A-Za-z\d]+@[A-Za-z.]+$/;

        if (!pattern.test(email)) {
            throw new TypeError('Invalid e-mail');
        }

        this._email = email;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        let lengthPattern = /^.{3,20}$/;
        let letterPattern = /^[A-Za-z]{3,20}$/;

        if (!lengthPattern.test(firstName)) {
            throw new TypeError('First name must be between 3 and 20 characters long');
        }

        if (!letterPattern.test(firstName)) {
            throw new TypeError('First name must contain only Latin characters');
        }

        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName) {
        let lengthPattern = /^.{3,20}$/;
        let letterPattern = /^[A-Za-z]{3,20}$/;

        if (!lengthPattern.test(lastName)) {
            throw new TypeError('Last name must be between 3 and 20 characters long');
        }

        if (!letterPattern.test(lastName)) {
            throw new TypeError('Last name must contain only Latin characters');
        }

        this._lastName = lastName;
    }
}
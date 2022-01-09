class User {
    constructor(firstName, lastName, address, telNumber, educationLevel, email, password) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._address = address;
        this._telNumber = telNumber;
        this._educationLevel = educationLevel;
        this._email = email;
        this._password = password;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get address() {
        return this._address;
    }

    get telNumber() {
        return this._telNumber;
    }

    get educationLevel() {
        return this._educationLevel;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    set firstName(newFirstName) {
        this._firstName = newFirstName;
    }

    set lastName(newLastName) {
        this._lastName = newLastName;
    }

    set address(newAddress) {
        this._address = newAddress;
    }

    set telNumber(newTelNumber) {
        this._telNumber = newTelNumber;
    }

    set educationLevel(newEducationLevel) {
        this._educationLevel = newEducationLevel;
    }

    set email(newEmail) {
        this._email = newEmail;
    }

    set password(newPassword) {
        this._password = newPassword;
    }
}

module.exports = User;
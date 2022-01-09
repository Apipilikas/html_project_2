// Η λογική που κρύβεται πίσω από την δημιουργία ξεχωριστών αρχείων για 
// την κλάση User και DAO έχει να κάνει καθαρά με θέματα τεχνολογίας σχεδίασης λογισμικού.
// Αυτό που επιτυγχάνουμε είναι ο server να έχει μόνο πρόσβαση σε συναρτήσεις που
// παρέχει η κλάση DAO (που με την σειρά της μπορεί να δημιουργήσει αντικείμενα User),
// χωρίς ουσιαστικά να μπορεί να έχει καμία πρόσβαση στο αντικείμενο User.
// >!< Τα ονόματα των μεταβλητών της κλάσης φροντίζουμε να είναι διαφορετικά 
// από των συναρτήσεων setters γιατί διαφορετικά καλούνται αναδρομικά.

const User = require('./user');

class DAO {
    constructor() {
        this._users = new Array();
    }

    get users() {
        return this._users;
    }

    set users(nUsers) {
        this._users = nUsers;
    }

    addUser(firstName, lastName, address, telNumber, educationLevel, email, password) {
        let user = new User(firstName, lastName, address, telNumber, educationLevel, email, password)
        this._users.push(user);
    }

    isUserWithEmail(email) {
        let flag = false;
        for (user of this._users) {
            if (user.email == email) {
                flag = true;
            }
        }
        return flag;
    }

    findUserByEmail(email) {
        for (user of this._users) {
            if (user.email == email) {
                return user;
            }
        }
        return null;
    }
}

module.exports = DAO;
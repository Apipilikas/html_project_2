// Η λογική που κρύβεται πίσω από την δημιουργία ξεχωριστών αρχείων για 
// την κλάση User και DAO έχει να κάνει καθαρά με θέματα τεχνολογίας σχεδίασης λογισμικού.
// Αυτό που επιτυγχάνουμε είναι ο server να έχει μόνο πρόσβαση σε συναρτήσεις που
// παρέχει η κλάση DAO (που με την σειρά της μπορεί να δημιουργήσει αντικείμενα User),
// χωρίς ουσιαστικά να μπορεί να έχει καμία πρόσβαση στο αντικείμενο User.
// >!< Τα ονόματα των μεταβλητών της κλάσης φροντίζουμε να είναι διαφορετικά 
// από των συναρτήσεων setters γιατί διαφορετικά καλούνται αναδρομικά.

const User = require('./user');
const mongodb = require('./mongodb');

const usersCollection = mongodb.users;

class DAO {
    constructor() {
        this._users = usersCollection;
    }

    get users() {
        return this._users.find().toArray(function (err, result) {
            if (err) {
                throw err;
            }
            return result;
        });
    }

    //set users(nUsers) {
    //this._users = nUsers;
    //}

    addUser(data) {
        let user = new User(data.firstName, data.lastName, data.address,
            data.telNumber, data.educationLevel, data.email, data.password);

        return this._users.insertOne(user);
    }

    isUserWithEmail(uEmail) {
        let query = { _email: uEmail };
        return this._users.find(query).toArray()
            .then(result => {
                console.log("Results for user with email " + uEmail, result)
                if (result.length === 0) {
                    return false;
                }
                else {
                    return true;
                }
            })

        //console.log(a);
        //return flag;
    }

    findUserByEmail(uEmail) {
        let query = { _email: uEmail };
        return this._users.find(query).toArray()
            .then(result => {
                if (result.length === 0) {
                    return null;
                }
                else {
                    return this._users.find(query).toArray();
                }
            })
    }
}

module.exports = DAO;
// Προτιμάται ο διαχωρισμός των αρχείων προκειμένου να
// αποκρύψουμε τα προσωπικά στοιχεία σύνδεσης.

const mongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Apipilikas:p3180157agg15@cluster.r0jin.mongodb.net/users-db?retryWrites=true&w=majority";

var client = new mongoClient(uri);

var usersDB = client.db("users-db");
var users = usersDB.collection("users");

// client.connect()
//     .then(() => {
//         var usersDB = client.db("users-db");
//         var users = usersDB.collection("users");
//         users.find().toArray(function(err, result){
//             if (err) {
//                 throw err;
//             }
//             console.log(result);
//             client.close();
//         });
//     });

module.exports = {
    client,
    users
};
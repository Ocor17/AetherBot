// Import the functions you need from the SDKs you need
require('dotenv').config();
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




//console.log("here to");
//console.log(firebaseConfig);
// Initialize Firebase
//const app = initializeApp(firebaseConfig);

const database = admin.firestore();

module.exports = database;



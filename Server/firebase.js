const firebaseConfig = require("./firebase.json")
const admin = require("firebase-admin");

admin.initializeApp(firebaseConfig);

module.exports = admin;
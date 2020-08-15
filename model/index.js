'use strict'

const firebase = require('firebase-admin')
const serviceAccout = require('../config/firebase.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccout),
    databaseURL : 'https://platzioverflow-286508.firebaseio.com/'

})

const db = firebase.database();
const Users = require('./users');


module.exports = {
    users : new Users(db)
}
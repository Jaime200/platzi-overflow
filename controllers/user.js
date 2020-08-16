'use strict'
const users = require('../model/index').users

async function createUser(req, h) {    
    try {
        let result  = await users.createUser(req.payload)    
        return h.response(`Usuario creado ID: ${result}`)    
    } catch (error) {
        console.error(error);
        return h.response('Problemas creando el usuario').code(500)
    }   
}

async function validateUser(req, h){
    try {
        let result = await users.validateUser(req.payload)
        return h.response(`Usuario: ${result}`)  
    } catch (error) {
        console.error(error);
        return h.response('Problemas validando el usuario').code(500)
    }
}


module.exports = {
    createUser,
    validateUser
}
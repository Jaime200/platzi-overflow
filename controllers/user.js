'use strict'
function createUser(req, h) {    
        console.log(req.payload)
        return 'usuario creado'
}


module.exports = {
    createUser
}
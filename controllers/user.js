'use strict'
const users = require('../model/index').users
const boom = require('@hapi/boom');
async function createUser(req, h) {    
    try {
        let result  = await users.createUser(req.payload) 
        return h.view('register',{
            title:'Registro',
            success : 'Usuario creado exitosamente'
        })
        //return h.response(`Usuario creado ID: ${result}`)    
    } catch (error) {
        console.error(error);
        return h.view('register',{
            title:'Registro',
            error : 'Error creando el usuario'
        })
        //return h.response('Problemas creando el usuario').code(500)
    }   
}

async function validateUser(req, h){
    try {
        let result = await users.validateUser(req.payload)
        if(!result){
            //return h.response(`Email y/o contraseña incorrecta`).code(401)      
            return h.view('login',{
                title:'Login',
                error : `Email y/o contraseña incorrecta`
            })
        }
        
        
        return h.redirect('/').state('user',{
            name:result.name,
            email:result.email
        })
    } catch (error) {
        console.error(error);
        return h.view('login',{
            title:'Login',
            error : 'Problemas validando el usuario'
        })
       // return h.response('Problemas validando el usuario').code(500)
    }
}

async function logout(req, h){
    return h.redirect('/login').unstate('user');
}


async function failValidation(req, h, err){

    const templates = {
        '/create-user':'register',
        '/validate-user' : 'login',
        '/create-question': 'ask'
    }
    return h.view(templates[req.path],{
        title : 'Error de validación',
        error : 'Por favor complete los campos requeridos'
    }).code(400).takeover()
    //return boom.badRequest('fallo la validación',req.payload)
}


module.exports = {
    createUser,
    validateUser,
    logout,
    failValidation
}
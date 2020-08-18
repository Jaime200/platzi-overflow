'use strict'
const questions = require('../model/index').questions
async function createQuestion(req, h){
    try {
        let result = await questions.create(req.payload, req.state.user)
        return h.response(`Pregunta creada con el Id ${result}`)

    } catch (error) {
        console.log('Ocurrio un error');
        return h.view('ask',{
            title:'Crear pregunta',
            error: 'Problema creando la regunta'
        }).code(500).takeover()
    }
}


module.exports = {
    createQuestion
}
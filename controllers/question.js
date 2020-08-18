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
async function answerQuestion (req, h){
    let result
    try {
        result = await questions.answer(req.payload, req.state.user)
        console.log(`Respuesta creada: ${result}`);
    } catch (error) {
        console.error(error);
        
    }
    return h.redirect(`/question/${req.payload.id}`)
}


module.exports = {
    answerQuestion,
    createQuestion
    
}
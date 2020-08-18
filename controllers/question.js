'use strict'
const questions = require('../model/index').questions
async function createQuestion(req, h){
    if(!req.state.user){
        return h.redirect('/login')
    }
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
    if(!req.state.user){
        return h.redirect('/login')
    }
    let result
    try {
        result = await questions.answer(req.payload, req.state.user)
        console.log(`Respuesta creada: ${result}`);
    } catch (error) {
        console.error(error);
        
    }
    return h.redirect(`/question/${req.payload.id}`)
}

async function setAnswerRight(req, h){
    if(!req.state.user){
        return h.redirect('/login')
    }
    let result
    try {
        result = await req.server.methods.setAnswerRight(req.params.questionId, req.params.answerId, req.state.user)
        console.log(result);
    } catch (error) {
        console.error(error);

    }
    return h.redirect(`/question/${req.params.questionId}`)
    
    
}


module.exports = {
    answerQuestion,
    createQuestion,
    setAnswerRight
    
}
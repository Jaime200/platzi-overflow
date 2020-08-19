'use strict'
const { writeFile }  = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const { v1: uuidv1 } = require('uuid');
const { server } = require('@hapi/hapi');

const write = promisify(writeFile);

const questions = require('../model/index').questions
async function createQuestion(req, h){
    if(!req.state.user){
        return h.redirect('/login')
    }
    let result, filename
    const bufferImg = Buffer.from(req.payload.image);

    if(Buffer.isBuffer(bufferImg)){
        filename = `${uuidv1()}.png`;          
        await write(join(__dirname,'..','public','SITIO_1','uploads',filename), req.payload.image);
    }

    try {
        result = await questions.create(req.payload, req.state.user,filename)
        
        return h.redirect(`/question/${result}`)

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
        //console.log(`Respuesta creada: ${result}`);
        req.log('info',`Respuesta creada: ${result}`)
    } catch (error) {
        console.error(error);
        req.log('error',`Ocurro un error ${error}`)
        
    }
    return h.redirect(`/question/${req.payload.id}`)
}

async function setAnswerRight(req, h){
    if(!req.state.user){
        return h.redirect('/login')
    }
    let result
    try {
        result = await req.server.methods.setAnswerRight( req.params.questionId, 
                                                            req.params.answerId, 
                                                            req.state.user)
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
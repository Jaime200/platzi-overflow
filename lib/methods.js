'use strict'
const questions = require('../model/index').questions
async  function setAnswerRight(questionId, answerId, user){

    let result 
    try {
        result = await questions.setAnswerRight(questionId, answerId, user)
        return result;
    } catch (error) {
        console.error(error)
        return false;
    }
}

async function getLast(amount){
    let data 
    try {
        data = await questions.getLast(10);
    } catch (error) {
        console.log('Error',error);
    }
    console.log('Se ejecuto el metodo');
    return data
}

module.exports = {
    setAnswerRight,
    getLast
}
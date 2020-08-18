'use strict'
const question = require('../model/index').questions
async  function setAnswerRight(questionId, answerId, user){

    let result 
    try {
        result = await question.setAnswerRight(questionId, answerId, user)
        return result;
    } catch (error) {
        console.error(error)
        return false;
    }
}


module.exports = {
    setAnswerRight
}
'use strict'
const handlerBars = require('handlebars');

 function registerHelper(){
    handlerBars.registerHelper('answerNumber',(answers)=>{
        const keys = Object.keys(answers).length;
        return keys
    })

    handlerBars.registerHelper('ifEquals',(a,b, options)=>{
        if(a === b){
            return options.fn(this)
        }
        return options.invers(this)
    })

    return handlerBars
}

module.exports = registerHelper();



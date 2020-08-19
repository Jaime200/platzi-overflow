const Joi = require('@hapi/joi');
const questions = require('../model/index').questions
const users = require('../model/index').users
const Boom = require('@hapi/boom');
//const authBasic = require('@hapi/basic')

module.exports = {
     name : 'api-rest',
     version : '1.0.0',
     async register(server,options){
        
        server.register(require('@hapi/basic'));
        server.auth.strategy('simple', 'basic', { validate : validateAuth }) 
        server.auth.default('simple')

         const prefix = options.prefix || 'api'
         server.route ({
             method:'GET',
             path: `/${prefix}/question/{key}`,
             options:{
                auth : 'simple',
                validate : {
                    params : Joi.object({
                        key :  Joi.string().required()
                    }),
                    failAction : failValidation
                }
             },
             handler : async (req, h) =>{
                let result 
                try {
                    result = await questions.getOne(req.params.key)
                    if(!result){
                        return Boom.notFound(`No se pudo enocntrar la pregunta con el id ${req.params.key}`)
                    }
                } catch (error) {
                    return Boom.badImplementation(`Error buscando ${req.params.key}`)
                }
            
                return result;
             }
         })


         server.route ({
            method:'GET',
            path: `/${prefix}/questions/{amount}`,
            options:{
                auth : 'simple',
               validate : {
                   params : Joi.object({
                    amount :  Joi.number().integer().min(1).max(20).required()
                   }),
                   failAction : failValidation
               }
            },
            handler : async (req, h) =>{
                let result 
                try {
                    result = await questions.getLast(req.params.amount)
                    if(!result){
                        return Boom.notFound(`No se pudo enocntrar la pregunta con el id ${req.params.key}`)
                    }
                } catch (error) {
                    return Boom.badImplementation(`Error buscando ${req.params.amount}`)
                }
            
                return result;
             }
        })


        function failValidation(req, h, err){
            return Boom.badRequest('Por favor utilice los parametros correctos')
         }

         async function validateAuth(req, username, password, h){
            let user
            try {
                
                user =  await users.validateUser({
                              email: username,
                              password: password
                            })
              } catch (error) {
                server.log('error', error)
              }
            return {
                credentials: user || {},
                isValid: (user !== false)
              }
         }

        // async function validate (req, username, password, h) {
        //     let user
        //     try {
        //         user = await users.validateUser({
        //           email: username,
        //           password: password
        //         })
        //       } catch (error) {
        //         server.log('error', error)
        //       }
        //       return {
        //         credentials: user || {},
        //         isValid: (user !== false)
        //       }
        // }
     }
}





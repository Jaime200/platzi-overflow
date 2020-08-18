'use strict'
const questions = require('../model/index').questions
async function home(req, h){
    const data = await req.server.methods.getLast(10)
    
    return h.view('index',{
        title : 'home',
        user : req.state.user,
        questions: data
    })
}

function register(req, h){
    if(req.state.user){
        return h.redirect('/')
    }
    return h.view('register',{
        title : 'Registro',
        user : req.state.user
    })
}



function login(req, h){
    if(req.state.user){
        return h.redirect('/')
    }
    return h.view('login',{
        title : 'Ingrese',
        user : req.state.user
    })
}

async function viewQuestion (req, h) {
  let data
  try {
    data = await questions.getOne(req.params.id)
    if (!data) {
      return notFound(req, h)
    }
    return h.view('question', {
        title: 'Detalles de la pregunta',
        user: req.state.user,
        question: data,
        key: req.params.id
      },{ layout:'layout'})
  } catch (error) {
    console.error(error)
  }

  
}

function notFound (req, h) {
  return h.view('404', {}, { layout: 'error-layout' }).code(404)
}

function fileNotFound(req, h) {
    const response = req.response
    if(response.isBoom && response.output.statusCode === 404){
        return h.view('404',{},{ layout:'error-layout'}).code(404)
    }

    return h.continue
}

function ask(req, h){
    if(!req.state.user){
        return h.redirect('/login') 
    }
    return h.view('ask',{
        title:'Crear pregunta',
        user: req.state.user

    })
}

// async function viewQuestion(req, h){
//     let data;
//     try {
//         console.log('enTRO');
//         data = await questions.getOne(req.params.id);
//         if(!data){
//             return notFound(req,h)
//         }
//         // return h.view('question',{
//         //     title:'Detalles de la pregunta',
//         //     user : req.state.user,
//         //     question : data,
//         //     key: req.params.id
//         // })


//         return h.view('ask',{
//             title:'Detalles de la pregunta',
//             user: req.state.user
    
//         })

//     } catch (error) {
//         console.log('ERROR====================================');
//         console.log(error);
        
//     }
// }

module.exports = {
    home,
    register,
    login,
    notFound,
    fileNotFound,
    ask,
    viewQuestion

}
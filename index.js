'use strict'
const Hapi = require('@hapi/hapi');
const handlerBars = require('./lib/helpers');
const vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const good = require('@hapi/good');
const methods = require('./lib/methods');
const path = require('path');
const routes = require('./routes');
const site = require('./controllers/site');
//  const handlerBars = require('handlebars')
const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
});

async function init(){
    
    try {
        await server.register(Inert);
        await server.register(vision);
        await server.register({
            plugin : good,
            options : {
               reporters :{
                   console : [{
                       module : require('@hapi/good-console')
                   },
                    'stdout'
                    ]
               } 
            }
        })

        server.method('setAnswerRight',methods.setAnswerRight)
        server.method('getLast',methods.getLast,{
            cache: {
                expiresIn : 1000 * 60,
                generateTimeout : 2000
            }
        })
        server.state('user', {
            ttl: (1000 * 60 * 60 * 24 * 7),
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json',
            // path: '/'
            })
        server.views({
            engines: { 
                hbs: handlerBars },
            relativeTo: __dirname,
            path: 'views',
            layout:true,
            layoutPath: 'views'
        });

     //console.log(routes);
        server.ext('onPreResponse',site.fileNotFound)
        server.route(routes)
        await server.start();  
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    //console.log(`Servidor iniciado en: ${server.info.uri}`);
    server.log('info',`Servidor iniciado en: ${server.info.uri}`);
}

process.on('unhandledRejection', error =>{
    // console.error('unhandledRejection', error.message);
    server.log('unhandledRejection',`Servidor iniciado en: ${server.info.uri}`);
})

process.on('unhandledException', error =>{
    //console.error('unhandledException', error.message);
    server.log('unhandledException',`Servidor iniciado en: ${server.info.uri}`);
})

init();





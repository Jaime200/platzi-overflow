'use strict'
const Hapi = require('@hapi/hapi');
const handlerBars = require('handlebars');
const vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const path = require('path');
const routes = require('./routes')
const site = require('./controllers/site')
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
        server.state('user', {
            ttl: (1000 * 60 * 60 * 24 * 7),
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json',
            path: '/'
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

    console.log(`Servidor iniciado en: ${server.info.uri}`);
}

process.on('unhandledRejection', error =>{
    console.error('unhandledRejection', error.message);
})

process.on('unhandledException', error =>{
    console.error('unhandledException', error.message);
})

init();





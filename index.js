'use strict'
const Hapi = require('@hapi/hapi');
const handlerBars = require('handlebars');
const vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const path = require('path');

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

        server.views({
            engines: { 
                hbs: handlerBars },
            relativeTo: __dirname,
            path: 'views',
            layout:true,
            layoutPath: 'views'
        });

        server.route({
            method: 'GET',
            path : '/',
            handler : (req, h)=>{
                return h.view('index',{
                    title : 'home'
                })
            }
        });

        server.route({
            method: 'GET',
            path : '/register',
            handler : (req, h)=>{
                return h.view('register',{
                    title : 'Registro'
                })
            }
        });

        server.route({
            method: 'POST',
            path : '/create-user',
            handler : (req, h)=>{
                console.log(req.payload)
                return 'usuario creado'
            }
        });
    
        server.route({
            method: 'GET',
            path : '/{param*}',
            handler : {
                directory : {
                    path : './SITIO_1',
                    index : ['index.html']
                }
            }
        });

        await server.start();  
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    console.log(`Servidor iniciado en: ${server.info.uri}`);
}


init();





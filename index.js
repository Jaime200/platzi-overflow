'use strict'
const Hapi = require('@hapi/hapi');
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
        await server.start();    
        server.route({
            method: 'GET',
            path : '/home',
            handler : (req, h)=>{
                return h.file('index.html')
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
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    console.log(`Servidor iniciado en: ${server.info.uri}`);
}


init();





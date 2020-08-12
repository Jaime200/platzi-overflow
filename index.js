'use strict'

const Hapi = require('hapi')

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
});

async function init(){
    server.route({
        method: 'GET',
        path : '/',
        handler : (req, h)=>{
            return 'Hola mundo'
        }
    });

    try {
        await server.start();    
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    console.log(`Servidor iniciado en: ${server.info.uri}`);
}


init();





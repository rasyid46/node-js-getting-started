// const express = require('express')
// const path = require('path')

const Joi = require('@hapi/joi');
const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: PORT
    });

    server.route([{
      method: 'GET',
      path: '/',
      handler: (request, h) => {

          return 'Hello World!';
      }
    },
    {  
        method: 'POST',
        path: '/persegi',
        config: {
          validate: {
            payload: { 
              panjang: Joi.number().min(1).required(),
              lebar: Joi.number().min(1).required()
            }
          }
        },
        handler: (request, h) => { 
             console.log(request.payload);      
             let panjangRequest= request.payload.panjang;
             let lebarRequest= request.payload.lebar;
             let hasil = parseInt (panjangRequest) * parseInt (lebarRequest)
             let statusCode = 200
             const contentData = {  
                          panjang: panjangRequest,
                          lebar : lebarRequest,
                          hasil: hasil 
             }
    
             const data = {
               statusCode : statusCode,
               error : "",
               message : "Hitung luas persegi",
               content : contentData 
             }
            return h.response(data).code(200)
        }
      }
]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
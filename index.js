import express from 'express';
import router from './router/rutas.js';
import db from './config/db.js';

const app = express();

const port = 3307;
app.use(express.urlencoded({extended:true}))
app.use('/auth',router);
app.set('view engine engine','pug');
app.set('views','./views');
app.use(express.static('src'))
app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})


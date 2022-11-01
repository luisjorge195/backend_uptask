import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/db.js';
import usuarioRoutes from './routes/UsuarioRoutes.js'
import projectRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'
import cors from 'cors'

const app = express();
dotenv.config();
connectDb();
//configurar cors
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Error de Cors"))
        }
    }//cual es el origen del req
}

app.use(cors(corsOptions))



app.use(express.json());
//Routing
app.use('/api/usuarios',usuarioRoutes);
app.use('/api/proyectos',projectRoutes); 
app.use('/api/tareas',tareaRoutes); 

const PORT = process.env.PORT || 4000;

app.listen(PORT , () => {
    console.log('Servidor conectado')
});
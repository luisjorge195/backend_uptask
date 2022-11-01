import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import Usuario from '../models/Usuarios.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js'
const registrar = async(req,res)=>{
    //evitar un registro duplicado
    
    const { email } =  req.body;
    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message})
    }
    
    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();
        //enviar enmail
        emailRegistro({
            email:usuario.email,
            nombre: usuario.nombre,
            token: usuario.token

        })
        res.status(201).json({msg: 'Usuario creado correctamente, Revisa tu Email'});
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async(req, res) => {
    //comprobar si el usuario existe
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ msg: error.message }); 
    } 
    //comprobar si el usuarico esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(404).json({ msg: error.message });
    } 
    //comprobar el password
    if (await usuario.comprobarPassword(password)) {
        res.status(201).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    }
    else{ 
        const error = new Error("Tu password es incorrecto");
        return res.status(403).json({ msg: error.message });
    }

} 

const confirmar = async(req, res) => {
    //req.params identiica klos parametros de la url
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});
    if(!usuarioConfirmar){
        const error = new Error("Token no válido");
        return res.status(403).json({ msg: error.message });
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ""; 
        await usuarioConfirmar.save();
        res.status(201).json({msg:"Usuario confirmado exitosamente"})
    } catch (error) {
        console.log(error)
    }
}

const olvidePassword = async(req, res) =>{
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ msg: error.message }); 
    } 
    try {
       usuario.token = generarId();
       await usuario.save();
       ///Enviar email
       emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
       });
       res.status(201).json({msg:"Hemos enviado un email con las instrucciones"}); 
    } catch (error) {
        console.log(error)
    }
}
const comprobarToken = async (req, res) => {
    const { token } = req.params; //extraemos el token de la url
    const tokenValido = await Usuario.findOne({token});
    if(tokenValido){
        res.status(201).json({msg: "Token válido"})
    }
    else{
        const error = new Error("Token no encontrado");
        return res.status(404).json({ msg: error.message }); 
    }
}
 const nuevoPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await Usuario.findOne({token});
    if(usuario){
        try {
            usuario.password = password;
            usuario.token = "";
            await usuario.save();
            res.status(201).json({msg:"Password modificado correctamente"});
        } catch (error) {
            console.log(error)
        }
    }
    else{
        const error = new Error("Token no encontrado");
        return res.status(404).json({ msg: error.message }); 
    }
 }
  const perfil = async (req, res) => {  
    const { usuario } = req;
    res.status(201).json(usuario);
  }
 
export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil };


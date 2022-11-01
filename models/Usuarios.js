import cryptojs from 'crypto-js';
import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true  
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token:{
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false
    }
},
{ 
    timestamps: true
}
);

usuarioSchema.pre("save", async function(next){
    
    if(!this.isModified("password")){ ///si no esta modificando el password no hagas nada
       return next();
    }
    const encrypt = cryptojs.AES.encrypt(this.password, "secret").toString();
    this.password = encrypt;
}); 


usuarioSchema.methods.comprobarPassword =  async function(passwordFormulario){
    return await cryptojs.AES.decrypt(this.password, "secret").toString(cryptojs.enc.Utf8) === passwordFormulario;
}
 
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario; 
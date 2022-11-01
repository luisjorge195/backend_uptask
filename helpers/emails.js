import nodemailer from 'nodemailer';
export const emailRegistro = async(datos)=>{
    const {email, nombre, token} = datos;
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:  process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    //informacion del email
    const info = await transport.sendMail({
        from: '"UP_TASK-Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject: "UPTASK -Comprueba tu cuenta",
        text:"Comprueba tu cuenta en UpTask",
        html: `<p>Hola:${nombre} Comprueba tu cuenta en UpTask </p>
        <>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
        `
    })
}

/////////////////////
export const emailOlvidePassword = async(datos)=>{
    const {email, nombre, token} = datos;
    //TODO: variables de entorno
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:  process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        } 
    });
    //informacion del email
    const info = await transport.sendMail({
        from: '"UP_TASK-Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject: "UPTASK -Restablece tu password",
        text:"Restablece tu password en UpTask",
        html: `<p>Hola:${nombre} Has solicitado restablecer tu password </p>
        Sigue el siguiente enlace para restablecer tu password:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer password </a>
        `
    })
}
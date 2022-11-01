import express from 'express';
import { autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

//Creacion resgitro y confirmacion de usuarios
router.post('/', registrar); //registrar usuarios
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
// router.get('/olvide-password/:token', comprobarToken);
// router.get('/olvide-password/:token', nuevoPassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);
router.get('/perfil', checkAuth, perfil)

export default router;
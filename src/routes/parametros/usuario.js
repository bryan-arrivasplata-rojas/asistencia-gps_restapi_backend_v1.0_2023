const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/parametros/usuarioController');

router.get('/laravel/usuarioall',methods.getUsuarioAll);
router.get('/laravel/usuariofaltante',methods.getUsuarioFaltante);
router.get('/laravel/usuario/:email',methods.getUsuario);
router.post('/laravel/usuario',methods.postUsuario);
router.put('/laravel/usuario/:email',methods.putUsuario);
router.delete('/laravel/usuario/:email',methods.deleteUsuario);

module.exports = router;
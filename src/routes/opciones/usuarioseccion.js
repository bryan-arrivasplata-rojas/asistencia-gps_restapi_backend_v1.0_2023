const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/opciones/usuarioseccionController');

router.get('/laravel/usuarioseccionall',methods.getUsuarioSeccionAll);
router.get('/laravel/usuarioseccion/:id',methods.getUsuarioSeccion);
router.post('/laravel/usuarioseccion',methods.postUsuarioSeccion);
router.put('/laravel/usuarioseccion/:id',methods.putUsuarioSeccion);
router.delete('/laravel/usuarioseccion/:id',methods.deleteUsuarioSeccion);

router.get('/laravel/usuarioseccion/email/:id',methods.getUsuarioSeccionEmail);
module.exports = router;
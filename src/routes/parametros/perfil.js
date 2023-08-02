const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/parametros/perfilController');

router.get('/laravel/perfilall',methods.getPerfilAll);
router.get('/laravel/perfil/:codigo',methods.getPerfil);
router.post('/laravel/perfil',methods.postPerfil);
router.put('/laravel/perfil/:codigo',methods.putPerfil);
router.delete('/laravel/perfil/:codigo',methods.deletePerfil);

router.get('/laravel/perfildocente',methods.getPerfilDocente);
router.get('/laravel/perfilalumno',methods.getPerfilAlumno);

module.exports = router;
const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/parametros/seccionController');

router.get('/laravel/seccionall',methods.getSeccionAll);
router.get('/laravel/seccion/:cod_seccion',methods.getSeccion);
router.post('/laravel/seccion',methods.postSeccion);
router.put('/laravel/seccion/:cod_seccion',methods.putSeccion);
router.delete('/laravel/seccion/:cod_seccion',methods.deleteSeccion);

module.exports = router;
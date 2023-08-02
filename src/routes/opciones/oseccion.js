const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/opciones/oseccionController');

router.get('/laravel/oseccionall',methods.getOSeccionAll);
router.get('/laravel/oseccion/:cod_oseccion',methods.getOSeccion);
router.post('/laravel/oseccion',methods.postOSeccion);
router.put('/laravel/oseccion/:cod_oseccion',methods.putOSeccion);
router.delete('/laravel/oseccion/:cod_oseccion',methods.deleteOSeccion);

router.get('/laravel/oseccioncurso/:cod_oseccion',methods.getOSeccionCurso);
router.get('/laravel/oseccionseccion/:cod_oseccion',methods.getOSeccionSeccion);

router.get('/laravel/oseccion/email/:cod_oseccion',methods.getOSeccionEmail);
module.exports = router;
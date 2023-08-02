const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/opciones/ocursoController');

router.get('/laravel/ocursoall',methods.getOCursoAll);
router.get('/laravel/ocurso/:cod_ocurso',methods.getOCurso);
router.post('/laravel/ocurso',methods.postOCurso);
router.put('/laravel/ocurso/:cod_ocurso',methods.putOCurso);
router.delete('/laravel/ocurso/:cod_ocurso',methods.deleteOCurso);

router.get('/laravel/ocurso/seccion/:cod_ocurso',methods.getOCursoSeccion);
router.get('/laravel/ocurso/oseccion/:cod_ocurso',methods.getOCursoOSeccion);

//router.get('/laravel/ocurso/seccion/:cod_op',methods.getOCursoSeccionDisponible);
router.get('/laravel/ocursodisponibleall/:cod_ocurso',methods.getCursoCicloDisponibleAll);
//router.get('/laravel/ocursodisponible/:cod_op',methods.getCursoCicloDisponible);

module.exports = router;
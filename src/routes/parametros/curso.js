const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/parametros/cursoController');

router.get('/laravel/cursoall',methods.getCursoAll);//getCursoFacultadAll
router.get('/laravel/curso/:cod_curso',methods.getCurso);
router.post('/laravel/curso',methods.postCurso);
router.put('/laravel/curso/:cod_curso',methods.putCurso);
router.delete('/laravel/curso/:cod_curso',methods.deleteCurso);

//router.get('/laravel/cursofacultadall/:cod_facultad',methods.getCursoFacultadAll);
module.exports = router;
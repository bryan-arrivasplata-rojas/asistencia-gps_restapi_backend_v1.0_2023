const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/parametros/facultadController');

router.get('/laravel/facultadall',methods.getFacultadAll);
router.get('/laravel/facultad/:cod_facultad',methods.getFacultad);
router.post('/laravel/facultad',methods.postFacultad);
router.put('/laravel/facultad/:cod_facultad',methods.putFacultad);
router.delete('/laravel/facultad/:cod_facultad',methods.deleteFacultad);

router.get('/laravel/facultad/curso/:cod_facultad',methods.getFacultadCurso);

module.exports = router;
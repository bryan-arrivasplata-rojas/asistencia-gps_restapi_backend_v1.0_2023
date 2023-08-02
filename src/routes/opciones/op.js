const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/opciones/opController');

router.get('/laravel/opall',methods.getOPAll);
router.get('/laravel/op/:cod_op',methods.getOP);
router.post('/laravel/op',methods.postOP);
router.put('/laravel/op/:cod_op',methods.putOP);
router.delete('/laravel/op/:cod_op',methods.deleteOP);

router.get('/laravel/op/osemana/:cod_op',methods.getOPOSemana);
router.get('/laravel/op/cursodisponible/:cod_op',methods.getOPCursoDisponible);
router.get('/laravel/op/aula/:cod_op',methods.getOPAula);
router.get('/laravel/op/ocurso/:cod_op',methods.getOPOCurso);

module.exports = router;
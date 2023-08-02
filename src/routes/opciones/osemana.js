const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/opciones/osemanaController');

router.get('/laravel/osemanaall',methods.getOSemanaAll);
router.get('/laravel/osemana/:cod_op_semana',methods.getOSemana);
router.post('/laravel/osemana',methods.postOSemana);
router.put('/laravel/osemana/:cod_op_semana',methods.putOSemana);
router.delete('/laravel/osemana/:cod_op_semana',methods.deleteOSemana);

router.get('/laravel/osemana/seccioncursofacultadop/:cod_seccion&:cod_op_semana&:cod_curso&:cod_op',methods.getOSemanaSeccionCursoFacultadOP);

module.exports = router;
const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/opciones/asistenciahabilitadoController');

router.get('/laravel/asistenciahabilitadoall',methods.getAsistenciaHabilitadoAll);
router.get('/laravel/asistenciahabilitado/:cod_asistencia_habilitado',methods.getAsistenciaHabilitado);
router.post('/laravel/asistenciahabilitado',methods.postAsistenciaHabilitado);
router.put('/laravel/asistenciahabilitado/:cod_asistencia_habilitado',methods.putAsistenciaHabilitado);
router.delete('/laravel/asistenciahabilitado/:cod_asistencia_habilitado',methods.deleteAsistenciaHabilitado);

module.exports = router;
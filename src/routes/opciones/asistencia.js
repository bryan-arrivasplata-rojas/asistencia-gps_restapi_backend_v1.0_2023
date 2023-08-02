const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/opciones/asistenciaController');

router.get('/laravel/asistenciaall',methods.getAsistenciaAll);
router.get('/laravel/asistencia/:id',methods.getAsistencia);
router.post('/laravel/asistencia',methods.postAsistencia);
router.put('/laravel/asistencia/:id',methods.putAsistencia);
router.delete('/laravel/asistencia/:id',methods.deleteAsistencia);

module.exports = router;
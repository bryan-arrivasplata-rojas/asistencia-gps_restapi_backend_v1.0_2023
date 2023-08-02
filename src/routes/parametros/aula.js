const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/parametros/aulaController');

router.get('/laravel/aulaall',methods.getAulaAll);
router.get('/laravel/aula/:cod_aula',methods.getAula);
router.post('/laravel/aula',methods.postAula);
router.put('/laravel/aula/:cod_aula',methods.putAula);
router.delete('/laravel/aula/:cod_aula',methods.deleteAula);

module.exports = router;
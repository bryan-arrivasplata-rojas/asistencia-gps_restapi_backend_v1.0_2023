const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/parametros/tipocicloController');

router.get('/laravel/tipocicloall',methods.getTipoCicloAll);
router.get('/laravel/tipociclo/:cod_tipo_ciclo',methods.getTipoCiclo);
router.post('/laravel/tipociclo',methods.postTipoCiclo);
router.put('/laravel/tipociclo/:cod_tipo_ciclo',methods.putTipoCiclo);
router.delete('/laravel/tipociclo/:cod_tipo_ciclo',methods.deleteTipoCiclo);

module.exports = router;
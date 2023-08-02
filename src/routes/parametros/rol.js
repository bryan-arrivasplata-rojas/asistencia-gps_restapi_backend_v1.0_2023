const {Router} = require('express');
const router = Router();
const methods = require('../../controllers/parametros/rolController');

router.get('/laravel/rolall',methods.getRolAll);
router.get('/laravel/rol/:tipo',methods.getRol);
router.post('/laravel/rol',methods.postRol);
router.put('/laravel/rol/:tipo',methods.putRol);
router.delete('/laravel/rol/:tipo',methods.deleteRol);

module.exports = router;
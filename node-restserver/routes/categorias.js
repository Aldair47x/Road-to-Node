const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
    getAllCategories, 
    getCategory, 
    updateCategory, 
    deleteCategory, 
    createCategory } = require('../controllers/categorias');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const { existeCategoriaPorId, estadoCategoriaPorId } = require('../helpers/db-validators');



const router = Router();


router.get('/', [
    validarCampos
], getAllCategories);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], getCategory );

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategory);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('id').custom( estadoCategoriaPorId ),
    validarCampos
], updateCategory );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],  deleteCategory);






module.exports = router;
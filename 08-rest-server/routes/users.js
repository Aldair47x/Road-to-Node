var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('get Usuario');
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  let body = req.body
  if( body.nombre === undefined){
    res.status(400).json({
      ok: false,
      mensaje: 'El nombre es necesario'
    })
  } else {
    
    res.json({body})
  }
});

/* PUT users listing. */
router.put('/:id', function(req, res, next) {
  let id = req.params.id
  res.json({id});
});

/* DELETE users listing. */
router.delete('/', function(req, res, next) {
  res.json('delete Usuario');
});

module.exports = router;

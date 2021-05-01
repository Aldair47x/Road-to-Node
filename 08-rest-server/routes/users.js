var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');


const Usuario = require('../models/users')




/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json('get Usuario');
});

/* POST users listing. */
router.post('/', async function (req, res, next) {
  let body = req.body

  let user = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    role: body.role
  })

  const salt = bcrypt.genSaltSync();

  const flagEmail = await Usuario.findOne({ email: body.email })

  if( flagEmail ) {
    return res.status(400).json({
      msg: "El correo ya está registrado"
    })
  }

  user.password = bcrypt.hashSync( body.password, salt )

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El nombre es necesario',
        err
      })
    } 
  });




  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: 'El nombre es necesario'
    })
  } else {

    res.json({
      user
    })
  }
});

/* PUT users listing. */
router.put('/:id', function (req, res, next) {
  let id = req.params.id
  res.json({
    id
  });
});

/* DELETE users listing. */
router.delete('/', function (req, res, next) {
  res.json('delete Usuario');
});

module.exports = router;
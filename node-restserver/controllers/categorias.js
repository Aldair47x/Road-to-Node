const { response, request } = require('express');
const { Usuario, Categoria, Role } = require('../models/index');






// Obtener todas las categorias -pagina - total - populate
const getAllCategories = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', "nombre")
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        categorias
    });
    
}

// Obtener categoria por id
const getCategory = async(req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id );

    res.json(categoria);
    
}


// Crear categoria - privado - cualquier persona con token valido
const createCategory = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre } ya existe`
        })
    }

    // Generar la data a guardar
    
    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    

    const categoria = new Categoria( data );

    //Guardar DB

    await categoria.save();

    res.status(201).json(categoria);
    
}

// actualizar - privado - cualquier persona con token valido
const updateCategory = async(req = request, res = response) => {

    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    console.log(nombre);

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre } ya existe`
        })
    }


    const categoria = await Categoria.findByIdAndUpdate(id, {nombre});
    res.json(categoria);

}


// Borrar categoria (estado false) - privado - cualquier persona con token valido - admin role
const deleteCategory = async(req = request, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false } );
    const usuarioAutenticado = req.usuarioAutenticado;


    res.json({
        categoria,
        usuarioAutenticado
    });
    

    
}


module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
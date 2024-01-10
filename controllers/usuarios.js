import db from "../config/db.js"
import { check, validationResult } from "express-validator"
const loginAdmin = (req,res)=>{
    res.render('loginGerente.pug',{
        pagina:"Administrador"
    })
}
const iniciarSesionAdmin= async (req,res)=>{
    await db.query(`SELECT * from admin where usuario="${req.body.usuario}" AND password="${req.body.password}"`,
    function(error, results, fields){
        if(!results.length){
            res.render('loginGerente.pug',{
                pagina:"Administrador",
                error:'Credenciales Incorrectas'
            })
            return;
        }
        res.render('inicioAdmin.pug',{
            pagina:'Administrador'
        })
    });

}
const loginEmpleado = (req,res)=>{
    res.render('loginEmpleado.pug',{
        pagina:"Empleado"
    })
}
const iniciarSesionEmpleado = async (req,res)=>{
    await db.query(`SELECT * from empleado where usuario="${req.body.usuario}" AND contra="${req.body.password}"`,
    function(error, results, fields){
        console.log(results[0].nombre_e)
        if(!results.length){
            res.render('loginEmpleado.pug',{
                pagina:"Empleado",
                error:'Credenciales Incorrectas'
            })
            return;
        }
        res.render('inicioEmpleado.pug',{
            nombreE:results[0].nombre_e+' '+results[0].apellido_p+' '+results[0].apellido_m
        })
    });
}
const tipologin = (req,res)=>{
    res.render('seleccionarLogin.pug',{
        pagina:"Selecciona como quieres iniciar sesión"
    })
}
//Funciones empleado
const registrarVenta = (req,res)=>{
    res.render('./funcionesEmpleado/regVenta.pug',{
        pagina:"Registrar Venta"
    })
}
const hacerVenta = async (req,res)=>{
    await check('id_producto').notEmpty().run(req);
    await check('fecha').notEmpty().run(req);
    await check('id_empleado').notEmpty().run(req);
    await check('id_mpago').notEmpty().run(req);
    const resultado = validationResult(req);
    console.log(resultado.array().length);
    console.log(req.length);
    console.log(req.length === undefined);
    if(resultado.array().length > 0){
        res.render('./funcionesEmpleado/regVenta.pug',{
            pagina:"Registrar Venta",
            error:"Todos los campos deben estar llenos"
        })
        return
    }
    //Valida que todos los campos esten llenos
    await db.query(`INSERT INTO venta (id_producto,fecha, empleado_id, cat_mpago_id) VALUES ("${req.body.id_producto}","${req.body.fecha}", ${req.body.id_empleado}, "${req.body.id_mpago}")`)
}
const verProductos = async (req,res)=>{
    await db.query(`SELECT * from productos`,
    function(error, results, fields){
        res.render('./funcionesEmpleado/verProductos.pug',{
            pagina:"Productos",
            productos:results
        })
    });
}
const compraProveedor = async (req,res)=>{
    res.render('./funcionesEmpleado/compraProveedor.pug',{
        pagina:"Compra a proveedor"
    })
}
const realizarCompraProveedor = async (req,res)=>{
    await check('id').notEmpty().run(req);
    await check('id_empleado').notEmpty().run(req);
    await check('id_producto').notEmpty().run(req);
    await check('id_proveedor').notEmpty().run(req);
    await check('fecha').notEmpty().run(req);
    const resultado = validationResult(req);
    if(resultado.array().length > 0){
        res.render('./funcionesEmpleado/compraProveedor.pug',{
            pagina:"Compra Proveedor",
            error:"Todos los campos deben estar llenos"
        })
        return
    }
    //Valida que todos los campos esten llenos
    await db.query(`INSERT INTO compraproveedor (id, id_empleado, id_producto, id_proveedor, fecha) VALUES ("${req.body.id}","${req.body.id_empleado}", "${req.body.id_producto}", "${req.body.id_proveedor}","${req.body.fecha}")`)
}
export{
    loginAdmin,
    tipologin,
    loginEmpleado,
    iniciarSesionAdmin,
    iniciarSesionEmpleado,
    registrarVenta,
    hacerVenta,
    verProductos,
    compraProveedor,
    realizarCompraProveedor
}
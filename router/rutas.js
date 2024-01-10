import express from 'express';
import { compraProveedor, hacerVenta, iniciarSesionAdmin, iniciarSesionEmpleado, loginAdmin, loginEmpleado, realizarCompraProveedor, registrarVenta, tipologin, verProductos } from '../controllers/usuarios.js';
const router = express.Router();
//Login Empleado
router.get('/loginEmpleado',loginEmpleado);
router.post('/loginEmpleado',iniciarSesionEmpleado);
//Login admin
router.get('/loginAdmin',loginAdmin);
router.post('/loginAdmin',iniciarSesionAdmin)
//Iniciar sesion como administrador o empleado
router.get('/tipoLogin',tipologin);
//Funciones empleado
router.get('/registrarVenta',registrarVenta);
router.post('/registrarVenta',hacerVenta);

router.get('/verProductos',verProductos);

router.get('/compraProveedor',compraProveedor);
router.post('/compraProveedor',realizarCompraProveedor);
export default router;
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevo producto

export function crearProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try {
            await clienteAxios.post('/productos', producto);
            dispatch( agregarProductoExito(producto))

            Swal.fire(
                'Correcto',
                'El producto se ha agregado',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch( agregarProductoError(true))

            Swal.fire(
                'Error',
                'Hubo un error.',
                'error'
            );
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = (producto) => ({
    type:AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
    
const agregarProductoError = (estado) => ({
    type:AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


//obtener productos

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            const response = await clienteAxios.get('/productos');
            dispatch( descargarProductosExito(response.data))
        } catch (error) {
            console.log(error);
            dispatch( descargarProductosError(true))
        }
    }
}
    
const descargarProductos = (estado) => ({
    type:DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExito = (productos) => ({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
    
const descargarProductosError = (estado) => ({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload: estado
})


//elimina un producto

export function eliminarProductoAction(id) {
    return async (dispatch) => {
        
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductosExito(id))

            Swal.fire(
                'Correcto',
                'El producto se eliminado correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductosError(true))
        }
    }
}

const eliminarProductosExito = (id) => ({
    type:PRODUCTO_ELIMINAR_EXITO,
    payload: id
})
    
const eliminarProductosError = (estado) => ({
    type:PRODUCTO_ELIMINAR_ERROR,
    payload: estado
})


//Selecciona un producto

export function obtenerProductoAction(id) {
    return async (dispatch) => {
        dispatch( obtenerProducto(id) );
    }
}

const obtenerProducto = (id) => ({
    type:OBTENER_PRODUCTO,
    payload: id
})

//Edita un producto

export function editarProductoAction(producto) {
    return async (dispatch) => {

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductosExito(producto))

            Swal.fire(
                'Correcto',
                'El producto se editó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch( editarProductosError(true))
        }
    }
}

const editarProductosExito = (id) => ({
    type:PRODUCTO_EDITAR_EXITO,
    payload: id
})
    
const editarProductosError = (estado) => ({
    type:PRODUCTO_EDITAR_ERROR,
    payload: estado
})

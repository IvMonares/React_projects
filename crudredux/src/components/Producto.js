import React from 'react';
import {useHistory} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import {eliminarProductoAction, obtenerProductoAction} from '../actions/productoActions'
import Swal from 'sweetalert2';


const Producto = ({producto}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: '¿Eliminar Producto?',
            icon: 'warning',
            html: `¿Desea eliminar el producto <b>${producto.nombre}</b>?`,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                dispatch( eliminarProductoAction(producto.id) );
            }
        });
    }

    const redirectEditar = () => {
        dispatch( obtenerProductoAction(producto.id) );
        history.push(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td>{producto.nombre}</td>
            <td className="d-flex justify-content-between">
                <span>$</span>
                <span
                    className="font-weight-bold"
                >
                    {Number(producto.precio).toFixed(2)}
                </span>
            </td>
            <td className="acciones text-center">
                <button
                    type="button"
                    className="btn btn-primary p-2 mr-2"
                    onClick={redirectEditar}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger p-2 ml-2"
                    onClick={confirmarEliminarProducto}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Producto;
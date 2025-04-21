import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import { editarProductoAction } from '../actions/productoActions';
import Spinner from './Spinner';

const EditarProducto = () => {

    const [mensaje, setMensaje] = useState(null);
    
    //use Dispatch
    const dispatch = useDispatch();
    const history = useHistory();

    //acceder al store
    const producto = useSelector( (state) => state.productos.producto);
    const cargando = useSelector( (state) => state.productos.loading);
    const error = useSelector( (state) => state.productos.error);

    const [productoEditar, setProductoEditar] = useState(producto);

    if (!productoEditar) {
        return null
    }

    //Call action
    const guardarProducto = (producto) => dispatch( editarProductoAction(producto) );

    const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setProductoEditar( {
            ...productoEditar,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(productoEditar.nombre.trim() === '' || productoEditar.precio <= 0){
            setMensaje("Verifique que los campos no estén vacíos.");
            return;
        }
        setMensaje(null);
        guardarProducto(productoEditar);

        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                       </h2>

                        <form
                        onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    name="nombre"
                                    value={productoEditar.nombre}
                                    onChange={handleChange}
                                />
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    name="precio"
                                    value={productoEditar.precio}
                                    onChange={handleChange}
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase b-block w-100 mt-3"
                                >Guardar cambios</button>
                            </div>
                        </form>
                        
                        {
                            cargando
                            ?
                            (
                                <div className="d-flex justify-content-center py-5">
                                    <Spinner />
                                </div>
                            )
                            :
                            null
                        }

                        {   
                            mensaje
                            ?
                            (
                                <p className="alert alert-danger p-2 mt-4 text-center">{mensaje}</p>
                            )
                            :
                            null
                        }

                        {   
                            error
                            ?
                            (
                                <p className="alert alert-danger p-2 mt-4 text-center">Hubo un error</p>
                            )
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarProducto;
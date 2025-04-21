import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';

import { crearProductoAction } from '../actions/productoActions';
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaActions';
import Spinner from './Spinner';


const NuevoProducto = ({history}) => {

    //state  del componente

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    //use Dispatch
    const dispatch = useDispatch();

    //acceder al store
    const cargando = useSelector( (state) => state.productos.loading);
    const error = useSelector( (state) => state.productos.error);
    const alerta = useSelector( (state) => state.alerta.alerta);

    //Call action
    const agregarProducto = (producto) => dispatch( crearProductoAction(producto) );

    const handleSubmit = (e) => {
        e.preventDefault();

        if(nombre.trim() === '' || precio <= 0){
            const nuevaAlerta = {
                msg: "Verifique que los campos no estén vacíos.",
                classes: "alert alert-danger p-2 mt-4 text-uppercase text-center"
            }
            dispatch( mostrarAlertaAction(nuevaAlerta) );
            return;
        }

        dispatch( ocultarAlertaAction(alerta) );

        agregarProducto({
            nombre, 
            precio
        });

        setNombre('');
        setPrecio(0);

        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
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
                                    name="name"
                                    value={nombre}
                                    onChange={(e) => {setNombre( e.target.value)}}
                                />
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Nombre del producto"
                                    name="price"
                                    value={precio}
                                    onChange={(e) => {setPrecio( Number(e.target.value) )}}
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase b-block w-100 mt-3"
                                >Agregar</button>
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
                            alerta
                            ?
                            (
                                <p className={alerta.classes}>{alerta.msg}</p>
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

export default NuevoProducto;
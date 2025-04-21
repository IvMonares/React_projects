import React, { Fragment, useEffect } from 'react';
import Spinner from './Spinner';
import { useDispatch, useSelector} from 'react-redux';

import { obtenerProductosAction } from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {

    //use Dispatch
    const dispatch = useDispatch();

    //acceder al store
    const cargando = useSelector( (state) => state.productos.loading);
    const error = useSelector( (state) => state.productos.error);
    const productos = useSelector( (state) => state.productos.productos);

    useEffect(() => {
        dispatch( obtenerProductosAction() );
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de productos</h2>
            
            {   
                error
                ?
                (
                    <p className="alert alert-danger p-2 mt-4 text-center">Hubo un error</p>
                )
                :
                null
            }

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col" className="text-center">Nombre</th>
                        <th scope="col" className="text-center">Precio</th>
                        <th scope="col" className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        productos.length === 0
                        ?
                        (
                            <Fragment>
                                <tr></tr>
                                <tr className="text-center">No hay productos</tr>
                                <tr></tr>
                            </Fragment>
                        )
                        :

                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))   
                    }
                </tbody>
            </table>
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
        </Fragment>
    );
}

export default Productos;
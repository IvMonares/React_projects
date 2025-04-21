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

//Cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false,
    producto: null
}

const productosReducer = (state = initialState, action) => {
    switch (action.type) {
        case DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        case OBTENER_PRODUCTO:
            return {
                ...state,
                producto: state.productos.filter(producto => producto.id === action.payload)[0]
            }
        case DESCARGA_PRODUCTOS_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
        case PRODUCTO_EDITAR_ERROR:
        case PRODUCTO_ELIMINAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                productos: action.payload,
                loading: false,
                error: null
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload],
                error: null
            }
        case PRODUCTO_ELIMINAR_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== action.payload),
                error: null
            }
        case PRODUCTO_EDITAR_EXITO:
            return {
                ...state,
                productos: state.productos.map(producto => producto.id === action.payload.id ? action.payload : producto),
                error: null,
                producto: null
            }
        default:
            return state;
    }
}

export default productosReducer;
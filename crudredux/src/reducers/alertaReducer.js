import {
    ALERTA_MOSTRAR,
    ALERTA_OCULTAR
} from '../types';

//Cada reducer tiene su propio state
const initialState = {
    alerta: null
}
const alertaReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALERTA_MOSTRAR:
        case ALERTA_OCULTAR:
            return {
                ...state,
                alerta: action.payload
            }
        default:
            return state;
    }
}
export default alertaReducer;
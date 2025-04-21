import {
    ALERTA_MOSTRAR,
    ALERTA_OCULTAR
} from '../types';

export function mostrarAlertaAction(alerta) {
    return (dispatch) => {
        dispatch( mostrarAlerta(alerta))
    }
}

export function ocultarAlertaAction() {
    return (dispatch) => {
        dispatch( ocultarAlerta())
    }
}

const mostrarAlerta = (alerta) => ({
    type:ALERTA_MOSTRAR,
    payload: alerta
})

const ocultarAlerta = () => ({
    type:ALERTA_OCULTAR,
    payload: null
})


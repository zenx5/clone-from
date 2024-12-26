import { createMenuView } from "../menu"
import {
    ADD_SOURCE,
    ADD_TEMPLATE,
    CHANGE_USER,
    UPDATE_TEMPLATES,
    CONFIG,
    NONE,
} from '../constant'

const CHANGE_DOWNLOAD_PREFER = 5

export default async function configView(state:stateType) {
    const localOption = await createMenuView(
        'Configuracion create-form\n',
        [
            ' Agregar repositorio fuente',
            ' Agregar template',
            ' Cambiar usuario de Github',
            ' Actualizar templates',
            ` ¿Confirmar descarga? ${ state.confirmDownload ? '[green]Si[/green]' : '[red]No[/red]'}`,
            ' Salir'
        ]
    ).render()
    if( localOption === CHANGE_DOWNLOAD_PREFER ) {
        return {
            localOption,
            confirmDownload: !state.confirmDownload
        }
    }
    return {
        localOption,
        currentView: [
            ADD_SOURCE,
            ADD_TEMPLATE,
            CHANGE_USER,
            UPDATE_TEMPLATES,
            CONFIG,
            NONE,
        ][ localOption - 1 ]
    }
}
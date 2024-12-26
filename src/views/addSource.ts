import { CONFIG } from "../constant"
import { createMenuView } from "../menu"

const SAVE = 1

export default async function addSourceView(state:stateType) {
    const [option, value] = await createMenuView(
        'Configuracion create-form\nAgregar repositorio fuente\n',
        [
            ' Repositorio:_' + state.repository,
            ' < Volver'
        ]
    ).renderInput() as [number, string]
    if( option === SAVE ) {
        // nuevo repositorio
        return {
            localOption: option,
            repository: value,
            currentView: CONFIG
        }
    }
    return {
        localOption: option,
        currentView: CONFIG
    }
}
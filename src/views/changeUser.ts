import { CONFIG } from "../constant"
import { createMenuView } from "../menu"

const SAVE = 1

export default async function changeUserView(state:stateType) {
    const [option, value] = await createMenuView(
        'Configuracion create-form\nCambiar usuario de GitHub\n',
        [
            ' Usuario:_'+state.user,
            ' < Volver'
        ]
    ).renderInput()
    if( option === SAVE ) {
        // nuevo user
        return {
            localOption: option,
            user: value,
            currentView: CONFIG
        }
    }
    return {
        localOption: option,
        currentView: CONFIG
    }
}
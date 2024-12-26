import { CONFIG } from "../constant"
import { createMenuView } from "../menu"

const SAVE = 1

export default async function addTemplateView(state:stateType) {
    const [option, value] = await createMenuView(
        'Configuracion create-form\nAgregar template\n',
        [
            ' Template url:_ ',
            ' < Volver'
        ]
    ).renderInput() as [number, string]
    if( option === SAVE && value.trim()!=='' ) {
        // nuevo template
        const templates = state.templates ?? []
        return {
            localOption: option,
            templates: [ ...templates, value],
            currentView: CONFIG
        }
    }
    return {
        localOption: option,
        currentView: CONFIG
    }
}
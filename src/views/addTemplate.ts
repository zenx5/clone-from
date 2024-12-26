import { CONFIG } from "../constant"
import { createMenuView } from "../menu"

const SAVE = 1

export default async function addTemplateView(state:stateType) {
    const templates = state.templates?.map( template => ` > ${template} -borrar-` ) ?? []
    const [option, value] = await createMenuView(
        'Configuracion create-form\nAgregar template\n',
        [
            ...templates,
            ' Template url:_ ',
            ' < Volver'
        ]
    ).renderInput() as [number, string]
    if( option === SAVE + templates.length && value.trim()!=='' ) {
        // nuevo template
        const templates = state.templates ?? []
        return {
            localOption: option,
            templates: [ ...templates, value],
            currentView: CONFIG
        }
    }
    else if( option < SAVE + templates.length ) {
        return {
            localOption: option,
            templates: state.templates?.filter( (_, index) => index != option - 1 ),
            currentView: CONFIG
        }
    }
    return {
        localOption: option,
        currentView: CONFIG
    }
}
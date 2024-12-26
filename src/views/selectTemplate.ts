import { CONFIG, UPDATE_TEMPLATES } from "../constant"
import { createMenuView } from "../menu"

export default async function selectTemplateView(state:stateType) {
    const templatesOne = (state.repoTemplates ?? []).map( item => item.name )
    const templatesTwo = state.templates ?? []
    const templates = [
        ...templatesOne,
        ...templatesTwo,
        'Actualizar templates',
        '< Ir a configuración'
    ]
    const option = await createMenuView(
        `Selecciona Template:\n${templates.length==2 ? ' --- Vacio ---\n' : ''}`,
        templates.map( template => ` ${template}`)
    ).render()

    if( option === templates.length ) {
        return {
            currentView: CONFIG
        }
    }
    else if( option === templates.length - 1 ) {
        return {
            currentView: UPDATE_TEMPLATES
        }
    }

    return {
        currentView: CONFIG
    }

}
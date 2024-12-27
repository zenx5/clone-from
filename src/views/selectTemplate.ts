import { CONFIG, UPDATE_TEMPLATES } from "../constant"
import { createMenuView } from "../menu"

export default async function selectTemplateView(state:stateType) {
    const templatesTwo = state.templates ?? []
    const templates = [
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
            pastView: state.currentView,
            currentView: CONFIG
        }
    }
    else if( option === templates.length - 1 ) {
        return {
            pastView: state.currentView,
            currentView: UPDATE_TEMPLATES
        }
    }

    return {
        pastView: state.currentView,
        currentView: CONFIG
    }

}
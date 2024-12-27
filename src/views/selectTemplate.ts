import { getIndex } from "../github"
import { CONFIG, UPDATE_TEMPLATES, SELECT_SUB_TEMPLATE, CONFIRM } from "../constant"
import { createMenuView } from "../menu"

export default async function selectTemplateView(state:stateType) {
    const templates = state.templates ?? []
    const option = await createMenuView(
        `Selecciona Template:\n${templates.length==0 ? ' --- Vacio ---\n' : ''}`,
        [
            ...templates.map( template => ` ${template}`),
            ' Actualizar templates',
            ' < Ir a configuración'
        ]
    ).render()

    if( option === templates.length + 2 ) {
        return {
            pastView: state.currentView,
            currentView: CONFIG
        }
    }
    else if( option === templates.length + 1 ) {
        return {
            pastView: state.currentView,
            currentView: UPDATE_TEMPLATES
        }
    }

    const tail = templates[ option - 1 ]
    const items = await getIndex(state.user as string, state.repository as string, tail)

    const isTemplate = items.filter( item => item.type==='file' ).length > 0

    return {
        localOption: option,
        pastView: state.currentView,
        selectedTemplate: {
            template:tail,
            subtemplate: ''
        },
        currentView: isTemplate ? CONFIRM : SELECT_SUB_TEMPLATE
    }

}
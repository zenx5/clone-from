import { getIndex } from "../github"
import { CONFIG, CONFIRM, SELECT_TEMPLATE } from "../constant"
import { createMenuView } from "../menu"

export default async function selectSubTemplateView(state:stateType) {
    if( !state.templates ) return  { currentView:CONFIG }
    const template = state?.templates[ Number(state.localOption) - 1 ]
    const subTemplates = await getIndex(state.user as string, state.repository as string, template )
    const option = await createMenuView(
        'Selecciona Sub-Template:\n ',
        [
            ...subTemplates.map( item => ` ${item.name} ` ),
            ' < Volver '
        ]
    ).render()

    if( option === subTemplates.length + 1 ) {
        return {
            currentView: SELECT_TEMPLATE
        }
    }

    return {
        selectedTemplate: {
            template,
            subtemplate: subTemplates[ option - 1 ].name
        },
        currentView: CONFIRM
    }

}
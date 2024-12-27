import { getIndex } from "../github"
import { CONFIRM } from "../constant"
import { createMenuView } from "../menu"

export default async function selectSubTemplateView(state:stateType) {
    if( !state.templates ) return  {}
    const template = state?.templates[ Number(state.localOption) - 1 ]
    const subTemplates = await getIndex(state.user as string, state.repository as string, template )
    const option = await createMenuView(
        'Selecciona Sub-Template:\n ',
        subTemplates.map( item => ` ${item.name} ` )
    ).render()


    return {
        selectedTemplate: {
            template,
            subtemplate: subTemplates[ option - 1 ].name
        },
        currentView: CONFIRM
    }

}
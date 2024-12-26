import { CONFIG } from "../constant"
import { createMenuView } from "../menu"

export default async function selectTemplateView(state:stateType) {
    const templatesOne = (state.repoTemplates ?? []).map( item => item.name )
    const templatesTwo = state.templates ?? []
    const templates = [
        ...templatesOne,
        ...templatesTwo,
        '< Volver'
    ]
    const option = await createMenuView(
        'Selecciona Template:\n',
        templates
    ).render()


    return {
        currentView: CONFIG
    }

}
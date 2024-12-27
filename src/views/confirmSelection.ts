import { getContent } from "../github"
import { NONE } from "../constant"
import { createMenuView } from "../menu"

export default async function confirmSelectionView(state:stateType) {
    const option = await createMenuView(
        '¿Seguro de su selcción?:\n',
        [
            "Sí",
            "No"
        ]
    ).render()

    if( option===1 ) {
        console.log('download')
        // `https://github.com/zenx5/test-templates.git`
        // 
        const url = `git@github.com:${state.user}/${state.repository}.git`
        const template = `${state?.selectedTemplate?.template as string}/${state?.selectedTemplate?.subtemplate as string}`
        await getContent(url, template)
    }

    return {
        currentView: NONE
    }

}
import { NONE } from "../constant"
import { createMenuView } from "../menu"
import { downloadTemplate } from "./downloadTemplate"

export default async function confirmSelectionView(state:stateType) {
    const option = await createMenuView(
        '¿Seguro de su selcción?:\n',
        [
            "Sí",
            "No"
        ]
    ).render()

    if( option===1 ) downloadTemplate(state)

    return {
        currentView: NONE
    }

}
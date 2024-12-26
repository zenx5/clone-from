import { CONFIG } from "../constant"
import { createMenuView } from "../menu"

export default async function confirmSelectionView(state:stateType) {
    const option = await createMenuView(
        '¿Seguro de su selcción?:\n',
        [
            "Sí",
            "No"
        ]
    ).render()


    return {
        currentView: CONFIG
    }

}
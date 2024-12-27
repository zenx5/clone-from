import { NONE } from "../constant.js";
import { createMenuView } from "../menu.js";
import { downloadTemplate } from "./downloadTemplate.js";
export default async function confirmSelectionView(state) {
    const option = await createMenuView('¿Seguro de su selcción?:\n', [
        "Sí",
        "No"
    ]).render();
    if (option === 1)
        downloadTemplate(state);
    return {
        currentView: NONE
    };
}

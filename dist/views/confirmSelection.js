import { getContent } from "../github/index.js";
import { NONE } from "../constant.js";
import { createMenuView } from "../menu.js";
export default async function confirmSelectionView(state) {
    const option = await createMenuView('¿Seguro de su selcción?:\n', [
        "Sí",
        "No"
    ]).render();
    if (option === 1) {
        const url = `https://github.com/${state.user}/${state.repository}.git`;
        const template = `${state?.selectedTemplate?.template}/${state?.selectedTemplate?.subtemplate}`;
        await getContent(url, template);
    }
    return {
        currentView: NONE
    };
}

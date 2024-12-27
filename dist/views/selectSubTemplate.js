import { getIndex } from "../github/index.js";
import { CONFIRM } from "../constant.js";
import { createMenuView } from "../menu.js";
export default async function selectSubTemplateView(state) {
    if (!state.templates)
        return {};
    const template = state?.templates[Number(state.localOption) - 1];
    const subTemplates = await getIndex(state.user, state.repository, template);
    const option = await createMenuView('Selecciona Sub-Template:\n ', subTemplates.map(item => ` ${item.name} `)).render();
    return {
        selectedTemplate: {
            template,
            subtemplate: subTemplates[option - 1].name
        },
        currentView: CONFIRM
    };
}

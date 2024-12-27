import { getIndex } from "../github/index.js";
import { CONFIG, CONFIRM, SELECT_TEMPLATE } from "../constant.js";
import { createMenuView } from "../menu.js";
import { downloadTemplate } from "./downloadTemplate.js";
export default async function selectSubTemplateView(state) {
    if (!state.templates)
        return { currentView: CONFIG };
    const template = state?.templates[Number(state.localOption) - 1];
    const subTemplates = await getIndex(state.user, state.repository, template);
    const option = await createMenuView('Selecciona Sub-Template:\n ', [
        ...subTemplates.map(item => ` ${item.name} `),
        ' < Volver '
    ]).render();
    if (option === subTemplates.length + 1) {
        return {
            currentView: SELECT_TEMPLATE
        };
    }
    if (!state.confirmDownload) {
        await downloadTemplate({
            ...state,
            selectedTemplate: {
                template,
                subtemplate: subTemplates[option - 1].name
            },
        });
        process.exit(0);
    }
    return {
        selectedTemplate: {
            template,
            subtemplate: subTemplates[option - 1].name
        },
        currentView: CONFIRM
    };
}

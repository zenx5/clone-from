import { getIndex } from "../github/index.js";
import { CONFIG, UPDATE_TEMPLATES, SELECT_SUB_TEMPLATE, CONFIRM, NONE } from "../constant.js";
import { createMenuView } from "../menu.js";
import { downloadTemplate } from "./downloadTemplate.js";
export default async function selectTemplateView(state) {
    const templates = state.templates ?? [];
    const option = await createMenuView(`Selecciona Template:\n${templates.length == 0 ? ' --- Vacio ---\n' : ''}`, [
        ...templates.map(template => ` ${template}`),
        ' Actualizar templates ',
        ' Ir a configuración > ',
        ' < Salir '
    ]).render();
    if (option === templates.length + 3) {
        return {
            pastView: state.currentView,
            currentView: NONE
        };
    }
    else if (option === templates.length + 2) {
        return {
            pastView: state.currentView,
            currentView: CONFIG
        };
    }
    else if (option === templates.length + 1) {
        return {
            pastView: state.currentView,
            currentView: UPDATE_TEMPLATES
        };
    }
    const tail = templates[option - 1];
    const items = await getIndex(state.user, state.repository, tail);
    const isTemplate = items.filter(item => item.type === 'file').length > 0;
    if (isTemplate && !state.confirmDownload) {
        await downloadTemplate({
            ...state,
            selectedTemplate: {
                template: tail,
                subtemplate: ''
            },
        });
        process.exit(0);
    }
    return {
        localOption: option,
        pastView: state.currentView,
        selectedTemplate: {
            template: tail,
            subtemplate: ''
        },
        currentView: isTemplate ? CONFIRM : SELECT_SUB_TEMPLATE
    };
}

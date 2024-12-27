import State from "./state.js";
import { CONFIG, NONE, SELECT_TEMPLATE } from './constant.js';
import configView from "./views/config.js";
import addSourceView from "./views/addSource.js";
import addTemplateView from "./views/addTemplate.js";
import changeUserView from "./views/changeUser.js";
import updateTemplatesView from "./views/updateTemplates.js";
import selectTemplateView from "./views/selectTemplate.js";
import selectSubTemplateView from "./views/selectSubTemplate.js";
import confirmSelectionView from "./views/confirmSelection.js";
await (async function () {
    const arg = process.argv.slice(2);
    const isHELP = arg.includes('--help');
    const isCONFIG = arg.includes('--config');
    if (isHELP) {
        console.log(`
            Usage: node src/index.ts [options]

            Options:
                --help      Show this help message
                --config    Create a new .config file
        `);
        process.exit(0);
    }
    const state = new State({
        currentView: CONFIG,
        localOption: 0,
        confirmDownload: false,
        repository: '',
        templates: [],
        user: ''
    }, { inited: SELECT_TEMPLATE, notInited: CONFIG });
    await state.load();
    if (isCONFIG) {
        state.setValue({
            currentView: CONFIG
        });
    }
    while (state.value().currentView !== NONE) {
        const indexView = state.value().currentView;
        const defaultAction = async () => ({ currentView: NONE });
        const ActionView = [
            defaultAction,
            configView,
            addSourceView,
            addTemplateView,
            changeUserView,
            updateTemplatesView,
            selectTemplateView,
            selectSubTemplateView,
            confirmSelectionView
        ][indexView];
        state.setValue({
            ...await ActionView(state.value())
        });
        await state.update();
    }
    process.exit(0);
})();
process.exit(0);

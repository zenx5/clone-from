import { writeTerminal } from "../terminal.js";
import { CONFIG } from "../constant.js";
import { createMenuView } from "../menu.js";
import { getIndex } from "../github/index.js";
export default async function updateTemplatesView(state) {
    writeTerminal('Configuracion clone-from\nActualizando templates...\n');
    if (state.user && state.repository) {
        const items = (await getIndex(state.user, state.repository)).filter(item => item.type === 'dir' && item.name !== '.github');
        await createMenuView(`Hemos terminado.\n${items.length} templates encontrados`, [" > Continuar"]).render();
        return {
            currentView: state.pastView ?? CONFIG,
            templates: items.map(item => item.path)
        };
    }
    await createMenuView("No se pudo actualizar", [" > Continuar"]).render();
    return {
        currentView: state.pastView ?? CONFIG
    };
}

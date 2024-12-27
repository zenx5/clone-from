import { CONFIG } from "../constant.js";
import { createMenuView } from "../menu.js";
const SAVE = 1;
export default async function addSourceView(state) {
    const [option, value] = await createMenuView('Configuracion clone-from\nAgregar repositorio fuente\n', [
        ' Repositorio:_' + state.repository,
        ' < Volver'
    ]).renderInput();
    if (option === SAVE) {
        // nuevo repositorio
        return {
            localOption: option,
            repository: value,
            currentView: CONFIG
        };
    }
    return {
        localOption: option,
        currentView: CONFIG
    };
}

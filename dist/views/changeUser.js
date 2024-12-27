import { CONFIG } from "../constant.js";
import { createMenuView } from "../menu.js";
const SAVE = 1;
export default async function changeUserView(state) {
    const [option, value] = await createMenuView('Configuracion clone-from\nCambiar usuario de GitHub\n', [
        ' Usuario:_' + state.user,
        ' < Volver'
    ]).renderInput();
    if (option === SAVE) {
        // nuevo user
        return {
            localOption: option,
            user: value,
            currentView: CONFIG
        };
    }
    return {
        localOption: option,
        currentView: CONFIG
    };
}

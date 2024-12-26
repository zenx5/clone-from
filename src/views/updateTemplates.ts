import { CONFIG } from "../constant"
import { createMenuView } from "../menu"

export default async function updateTemplatesView(state:stateType) {
    const option = await createMenuView(
        'Configuracion create-form\nActualizando templates...\n',
        [
            '[bgBlack][yellow]Para cancelar usa `Ctrl+C`[/yellow][/bgBlack]'
        ]
    ).render()
    return {
        currentView: CONFIG
    }

}
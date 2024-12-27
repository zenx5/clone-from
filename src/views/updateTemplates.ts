import { writeTerminal } from "../terminal"
import { CONFIG } from "../constant"
import { createMenuView } from "../menu"
import { getIndex } from "../github"

export default async function updateTemplatesView(state:stateType) {
    writeTerminal('Configuracion clone-from\nActualizando templates...\n')
    if( state.user && state.repository ){
        const items = (await getIndex(state.user, state.repository)).filter( item => item.type==='dir' && item.name!=='.github' )
        await createMenuView(`Hemos terminado.\n${items.length} templates encontrados`, [" > Continuar"]).render()
        return {
            currentView: state.pastView ?? CONFIG,
            templates: items.map( item => item.path )
        }
    }
    await createMenuView("No se pudo actualizar", [" > Continuar"]).render()

    return {
        currentView: state.pastView ?? CONFIG
    }

}
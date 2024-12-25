import { createMenuView } from "./menu"

await (async function(){
    const arg = process.argv.slice(2)

    const isHELP = arg.includes('--help')
    const isCONFIG = arg.includes('--config')

    if( isHELP ){
        console.log(`
            Usage: node src/index.ts [options]

            Options:
                --help      Show this help message
                --config    Create a new .config file
        `)
        process.exit(0)
    }
    const NONE = 0
    const CONFIG = 1
    const ADD_SOURCE = 2
    const ADD_TEMPLATE = 3
    const CHANGE_USER = 4
    const UPDATE_TEMPLATES = 5
    const SELECT_TEMPLATE = 6
    const SELECT_SUB_TEMPLATE = 7
    const CONFIRM = 8

    const STATE = {
        currentView: CONFIG,
        localOption: 0,
        confirmDownload: false,
    }

    while(STATE.currentView !== NONE) {

        switch(STATE.currentView){
            case CONFIG:
                STATE.localOption = await createMenuView(
                    'Configuracion create-form\n',
                    [
                        ' Agregar repositorio fuente',
                        ' Agregar template',
                        ' Cambiar usuario de Github',
                        ' Actualizar templates',
                        ` ¿Confirmar descarga? ${ STATE.confirmDownload ? '[green]Si[/green]' : '[red]No[/red]'}`,
                        ' Salir'
                    ]
                ).render()
                if( STATE.localOption === 5 ) {
                    STATE.confirmDownload = !STATE.confirmDownload
                }
                STATE.currentView = [
                    ADD_SOURCE,
                    ADD_TEMPLATE,
                    CHANGE_USER,
                    UPDATE_TEMPLATES,
                    CONFIG,
                    NONE,
                ][ STATE.localOption - 1]
                break
            case ADD_SOURCE:
                STATE.localOption = await createMenuView(
                    'Configuracion create-form\nAgregar repositorio fuente\n',
                    [
                        ' Repositorio: ',
                        ' < Volver'
                    ]
                ).render()
                if( STATE.localOption === 1 ) {
                    // nuevo repositorio
                }
                STATE.currentView = CONFIG
                break;
            case ADD_TEMPLATE:
                STATE.localOption = await createMenuView(
                    'Configuracion create-form\nAgregar template\n',
                    [
                        ' Template url: ',
                        ' < Volver'
                    ]
                ).render()
                if( STATE.localOption === 1 ) {
                    // nuevo repositorio
                }
                STATE.currentView = CONFIG
                break;
            case CHANGE_USER:
                STATE.localOption = await createMenuView(
                    'Configuracion create-form\nCambiar usuario de GitHub\n',
                    [
                        ' Usuario: ',
                        ' < Volver'
                    ]
                ).render()
                if( STATE.localOption === 1 ) {
                    // nuevo repositorio
                }
                STATE.currentView = CONFIG
                break;
            case UPDATE_TEMPLATES:
                STATE.localOption = await createMenuView(
                    'Configuracion create-form\nActualizando templates...\n',
                    [
                        '[bgBlack][yellow]Para cancelar usa `Ctrl+C`[/yellow][/bgBlack]'
                    ]
                ).render()
                if( STATE.localOption === 1 ) {
                    // nuevo repositorio
                }
                STATE.currentView = CONFIG
                break;
            default:
                STATE.currentView = NONE
        }
    }
    console.log('Bye')
    // process.exit(0)

})()
process.exit(0)
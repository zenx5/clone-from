import State from "./state"
import {
    CONFIG,
    NONE,
    SELECT_TEMPLATE,
    SELECT_SUB_TEMPLATE
} from './constant'
import configView from "./views/config"
import addSourceView from "./views/addSource"
import addTemplateView from "./views/addTemplate"
import changeUserView from "./views/changeUser"
import updateTemplatesView from "./views/updateTemplates"
import selectTemplateView from "./views/selectTemplate"
import selectSubTemplateView from "./views/selectSubTemplate"


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

    const state = new State({
        currentView: CONFIG,
        localOption: 0,
        confirmDownload: false,
        repository: '',
        templates: [],
        user:''
    }, { inited:SELECT_TEMPLATE, notInited:CONFIG })

    await state.load()

    while(state.value().currentView !== NONE) {
        const defaultAction = async () => ({ currentView: NONE })
        const ActionView = [
            defaultAction,
            configView,
            addSourceView,
            addTemplateView,
            changeUserView,
            updateTemplatesView,
            selectTemplateView,
            selectSubTemplateView
        ][state.value().currentView as number]

        state.setValue({
            ...await ActionView(state.value())
        })
        await state.update()
    }
    console.log('Bye')
    process.exit(0)

})()
process.exit(0)
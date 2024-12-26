import fs from 'node:fs'

export default class State {

    STATE:stateType = {
        currentView: 0,
        localOption: 0,
        confirmDownload: false,
        repository: '',
        templates: [],
        user:'',
        lastUpdate: 0
    }
    defaultViews:viewDefaultType = {
        inited:0,
        notInited:0
    }
    constructor(initState:stateType, views?:viewDefaultType) {
        this.STATE = Object.assign( this.STATE, initState)
        if( views ) {
            this.defaultViews.inited = views.inited
            this.defaultViews.notInited = views.notInited
        }
        else if( initState?.currentView ) {
            this.defaultViews.inited = initState?.currentView
            this.defaultViews.notInited = initState?.currentView
        }
    }

    setValue(data:stateType) {
        this.STATE = {
            ...this.STATE,
            ...data
        }
    }

    value(){
        return this.STATE
    }

    async getJson() {
        try{
            const jsonFile = await fs.readFileSync('config.json', 'utf-8')
            return JSON.parse(jsonFile)
        }
        catch(e) {
            const jsonData = {
                userName: "",
                repoTemplates: "",
                confirmDownload: false,
                templates: [],
                lastUpdate: Date.now()
            }
            await fs.writeFileSync('config.json', JSON.stringify(jsonData))
            return jsonData;
        }
    }

    async load() {
        const current = Date.now()
        const json = await this.getJson()
        this.STATE.user = json.userName
        this.STATE.currentView = json.userName ? this.defaultViews.inited : this.defaultViews.notInited
        this.STATE.repository = json.repoTemplates
        this.STATE.templates = json.templates
        this.STATE.lastUpdate = json.lastUpdate
        this.STATE.confirmDownload = json.confirmDownload
    }

    async update() {
        await fs.writeFileSync('config.json', JSON.stringify({
            userName: this.STATE.user,
            repoTemplates: this.STATE.repository,
            confirmDownload: this.STATE.confirmDownload,
            templates: this.STATE.templates,
            lastUpdate: this.STATE.lastUpdate
        }))
    }

}
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
    constructor(initState:stateType) {
        this.STATE = Object.assign( this.STATE, initState)
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

    async load() {
        const current = Date.now()
        const jsonFile = await fs.readFileSync('config.json', 'utf-8')
        const json = JSON.parse(jsonFile)
        this.STATE.user = json.userName
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
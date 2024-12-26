export default class State {

    STATE:stateType = {
        currentView: 0,
        localOption: 0,
        confirmDownload: false,
        repository: '',
        templates: [],
        user:''
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


}
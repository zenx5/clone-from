type templateType = {
    name: string,
    parent: string,
    childrens: templateType[]
}

type stateType = {
    currentView?: number,
    pastView?: number,
    localOption?: number,
    confirmDownload?: boolean,
    repository?: string,
    templates?: string[],
    user?: string,
    lastUpdate?: number,
    selectedTemplate?: {
        template?: string,
        subtemplate?: string
    }
}

type viewDefaultType = {
    inited:number,
    notInited:number
}
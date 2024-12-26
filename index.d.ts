type templateType = {
    name: string,
    parent: string,
    childrens: templateType[]
}

type stateType = {
    currentTemplate?: string[],
    currentView?: number,
    localOption?: number,
    confirmDownload?: boolean,
    repository?: string,
    repoTemplates?: templateType[],
    templates?: string[],
    user?: string,
    lastUpdate?: number
}

type viewDefaultType = {
    inited:number,
    notInited:number
}
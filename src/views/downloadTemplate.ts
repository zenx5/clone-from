import { getContent } from "../github"

export const downloadTemplate = async (state:stateType) => {
    const url = `https://github.com/${state.user}/${state.repository}.git`
    const template = `${state?.selectedTemplate?.template as string}/${state?.selectedTemplate?.subtemplate as string}`
    await getContent(url, template)
}
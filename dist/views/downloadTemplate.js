import { getContent } from "../github/index.js";
export const downloadTemplate = async (state) => {
    const url = `https://github.com/${state.user}/${state.repository}.git`;
    const template = `${state?.selectedTemplate?.template}/${state?.selectedTemplate?.subtemplate}`;
    await getContent(url, template);
};

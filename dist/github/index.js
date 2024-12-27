import { execute } from './command.js';
export const getIndex = async (user, repoName, tail = '') => {
    const url = `https://api.github.com/repos/${user}/${repoName}/contents/${tail}`;
    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch (e) {
        return [];
    }
};
export const getContent = async (url, template) => {
    const nameProject = process.argv.slice(2);
    const currentPath = import.meta.dirname;
    const dirname = currentPath.slice(0, currentPath.indexOf('src'));
    if (!nameProject)
        return;
    try {
        await execute(`sudo rm -r ${dirname}.cloned 2>.log`);
    }
    catch (e) {
        console.log('removed dir');
    }
    try {
        const { error: errorClone, message: messageClone } = await execute(`git clone ${url} ${dirname}.cloned`);
        if (errorClone)
            throw new Error(messageClone);
        const { error: errorMkdir, message: messageMkdir } = await execute(`mkdir ${nameProject}`);
        if (errorMkdir)
            throw new Error(messageMkdir);
        const { error: errorMove, message: messageMove } = await execute(`mv ${dirname}.cloned/${template}/* ${nameProject}`);
        if (errorMove)
            throw new Error(messageMove);
        const { error: errorRemove2, message: messageRemove2 } = await execute(`sudo rm -r ${dirname}.cloned`);
        if (errorRemove2)
            throw new Error(messageRemove2);
        const { error: errorIn, message: messageIn } = await execute(`cd ${nameProject}`);
        if (errorIn)
            throw new Error(messageIn);
        const { error: errorLs, message: messageLs } = await execute(`ls -l`);
        if (errorLs)
            throw new Error(messageLs);
        // await execute(`git init`)
        // await execute(`git add .`)
        // await execute(`git commit -m 'first commit: ${template}' `)
    }
    catch (e) {
        console.log(e.message);
    }
};

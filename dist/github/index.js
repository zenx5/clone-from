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
        await execute(`git clone ${url} ${dirname}.cloned`);
        await execute(`mkdir ${nameProject}`);
        await execute(`mv ${dirname}.cloned/${template}/* ${nameProject}`);
        await execute(`sudo rm -r ${dirname}.cloned`);
        await execute(`cd ${nameProject} && git init && git add . && git commit -m 'first commit: ${template}'`);
    }
    catch (e) {
        console.log(e.message);
    }
};

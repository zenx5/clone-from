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
    if (!nameProject)
        return;
    try {
        await execute(`git clone ${url} .cloned`);
        await execute(`mkdir ${nameProject}`);
        await execute(`mv .cloned/${template}/* ${nameProject}`);
        await execute(`sudo rm -r .cloned`);
        await execute(`cd ${nameProject}`);
        await execute(`git init`);
        await execute(`git add .`);
        await execute(`git commit -m 'first commit: ${template}' `);
    }
    catch (e) {
        console.log(e);
    }
};

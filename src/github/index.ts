import { execute } from './command'

export const getIndex = async (user:string, repoName:string, tail:string = '') => {
    const url = `https://api.github.com/repos/${user}/${repoName}/contents/${tail}`
    try{
        const response = await fetch(url)
        return await response.json() as { type:string, path:string, name:string }[]
    }
    catch(e){
        return []
    }
}

export const getContent = async(url:string, template:string) => {
    try{
        await execute(`git clone ${url} .cloned`)
        await execute(`mv .cloned/${template}/* .`)
        await execute(`sudo rm -r .cloned`)
        await execute(`git init`)
        await execute(`git add .`)
        await execute(`git commit -m 'first commit: ${template}' `)
    }
    catch(e) {
        console.log(e)
    }
}
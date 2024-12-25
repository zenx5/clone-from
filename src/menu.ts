import { createMenu } from 'terminal-i2'

const configMenu = {
    markedOption: 0,
    colorTitle: 'white',
    bgColorOption: '',
    colorOption: 'white',
    bgColorOptionHover: 'bgYellow',
    colorOptionHover: 'grey',
}

const createMenuView = function(title:string, options:string[]){
    return new createMenu({
        ...configMenu,
        title,
        options
    })
}

export { createMenuView }
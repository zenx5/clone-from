import { createMenu } from 'terminal-i2'
import { cleanTerminal, catchArrows } from './terminal'

const configMenu = {
    markedOption: 0,
    colorTitle: 'white',
    bgColorOption: '',
    colorOption: 'white',
    bgColorOptionHover: 'bgYellow',
    colorOptionHover: 'grey',
}



class Menu2 extends createMenu{
    constructor(config:any){
        super(config)
    }

    async renderInput(waitEnter = true){
        let isReturn = false
        let isArrow = false
        let option = this.markedOption + 1
        if( this.options.length === 0 ) return [0, '']
        do {
            const canDelete = this.options[ option - 1 ].at(-2)!==':' && this.options[ option - 1 ].at(-1)!=='_'
            const isInput = this.options[ option - 1 ].includes(':_')
            cleanTerminal()
            await this.renderMenu(option)
            const response = await catchArrows() as { isArrow: boolean, name: string }
            cleanTerminal()
            isArrow = response.isArrow
            isReturn = response.name === 'return'
            if( response.name === 'up' ){
                option = option === 1 ? this.options.length : option-1
            }
            else if( response.name === 'down' ){
                option = option === this.options.length ? 1 : option+1
            }
            else if( !response.isArrow && response.name && isInput ) {
                if( response.name === 'backspace' ) {
                    if( canDelete ){
                        this.options[ option - 1 ] = this.options[ option - 1 ].slice(0,-1)
                    }
                }
                else if( response.name.length === 1 ) {
                    this.options[ option - 1 ] += response.name
                }
            }

        } while(isArrow || waitEnter && !isReturn )
        if( this.isTemp ) {
            this.isTemp = false;
            this.title = ""
            this.options = []
        }
        const [textOption, value] = this.options[ option - 1 ].split(':_')
        return [option, value]
    }
}

const createMenuView = function(title:string, options:string[]){
    return new Menu2({
        ...configMenu,
        title,
        options
    })
}

export { createMenuView }
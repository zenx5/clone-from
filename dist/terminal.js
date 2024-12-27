import readline from 'node:readline';
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
});
export const readTerminal = async (prompt, close) => {
    return new Promise((resolve, reject) => {
        try {
            terminal.question(prompt, (response) => {
                if (close)
                    terminal.close();
                resolve(response);
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
export const writeTerminal = async (prompt) => {
    terminal.write(prompt);
};
export const cleanTerminal = (x = 0, y = 0) => {
    terminal.write('\x1b[2J\x1b[' + x + ';' + y + 'H');
};
export const catchArrows = async () => {
    return new Promise((resolve, reject) => {
        try {
            process.stdin.setMaxListeners(100);
            process.stdin.on('keypress', function (character, key) {
                if (key && key.ctrl && key.name == 'c') {
                    process.stdin.pause();
                    reject('exit');
                }
                if (['up', 'down', 'left', 'right'].includes(key.name)) {
                    resolve({ isArrow: true, name: key.name });
                }
                else {
                    resolve({ isArrow: false, name: key?.name ?? key?.sequence });
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};

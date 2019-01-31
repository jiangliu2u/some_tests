import StringBuilder = require('node-stringbuilder');
import * as path from 'path';
import * as execa from 'execa';

let current: StringBuilder | null = null;
let last: StringBuilder | null = null;


export async function update() {
    current = new StringBuilder();
    last = new StringBuilder();
    const pa = path.join(__dirname);
    current.appendLine('\n 正在执行： npm i');
    appentOut(await execa("npm", ["i"], pa));
}

export function getMessage() {
    let str = `最近的更新：${last ? last.toString() : '无'}
            当前更新：${current ? current.toString() : '无'}`;
    str = str.replace(/\n/g, '<br/>');
    return str;
}

function appentOut({stdout, stderr}: { stdout?: string, stderr?: string }) {
    if (current) {
        if (stdout) {
            current.appendLine(stdout)
        }
        if (stderr) {
            current.appendLine(stderr)
        }
    }
}
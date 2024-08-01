import chalk from 'chalk'


export function format(message: string, ...params: Array<number | string>): string {
    return message.replace(
        /\{(black|red|green|yellow|blue|magenta|cyan|white|gray|grey|blackBright|redBright|greenBright|yellowBright|blueBright|magentaBright|cyanBright|whiteBright|)\}/g,
        (match, color) => {
            const param = params.shift() ?? panic(`In message:\n> {}\nMissing parameter:\n> {}`, message, match)
            return color ? (chalk as any)[color](param) : param
        }
    )
}

export function panic(message: string, ...params: Array<number | string>): never {
    console.error(chalk.redBright('ERROR: ' + format(message, ...params)))
    process.exit(1)
}

export function unreachable(message: string, ...params: Array<number | string>): never {
    panic(message, ...params)
}

export function warn(message: string, ...params: Array<number | string>) {
    console.warn(chalk.yellow(format(message, ...params)))
}

export function println(message: string, ...params: Array<number | string>) {
    console.log(format(message, ...params))
}

export function debug(message: string, ...params: Array<number | string>) {
    console.warn(chalk.cyan(format(message, ...params)))
}


export function stringifyLog(value: any) {
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };
    const stringified = JSON.stringify(value, getCircularReplacer(), 2);

    console.log(stringified);
}
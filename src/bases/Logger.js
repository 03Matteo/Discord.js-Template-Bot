const dateTimePad = (value, digits) => {
    let number = value;
    while (number.toString().length < digits) {
        number = `0${number}`;
    }
    return number;
}

const format = (tDate) => {
    return (`${dateTimePad((tDate.getMonth() + 1), 2)}/${dateTimePad(tDate.getDate(), 2)}/${tDate.getFullYear()} - ${dateTimePad(tDate.getHours(), 2)}:${dateTimePad(tDate.getMinutes(), 2)}:${dateTimePad(tDate.getSeconds(), 2)}`);
}

module.exports = class Logger {
    static log(content, type = 'log') {
        const date = `[${format(new Date(Date.now()))}]:`;
        switch (type) {
            case 'log': return console.log(`LOG:\n${date} | ${content}`);
            case 'warn': return console.log(`WARN:\n${date} | ${content}`);
            case 'error': return console.log(`ERROR:\n${date} | ${content}`);
            case 'debug': return console.log(`DEBUG:\n${date} | ${content}`);
            case 'cmd': return console.log(`CMD:\n${date} | ${content}`);
            case 'ready': return console.log(`READY:\n${date} | ${content}`);
            default: throw new TypeError('Logger type must be either warn, debug, log, ready, cmd or error.');
        }
    }
};
module.exports = function CustomReporter(runner) {
    let mocha = require('mocha');
    mocha.reporters.Base.call(this, runner);

    runner.on('start', () => {
        console.log("MOCHA START %s", new Date());
    });
    runner.on('end', () => {
        console.log('MOCHA ENDS');
    });
    runner.on('fail', (test, err) => {
        var lines = err.stack.split("\n");
        var message = lines.shift();
        lines.forEach(line => {
            line = line.replace(/^.*\(/, "").replace(/\)/, "");
            console.log("MOCHA ERROR %s %s", line, message);
        });
    });
};
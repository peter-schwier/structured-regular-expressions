let pegjs = require("pegjs");
let tspegjs = require("ts-pegjs");
let fs = require("fs");

var source = fs.readFileSync("./src/parser.pegjs").toString();

var parser = pegjs.generate(
    source,
    {
        output: "source",
        format: "commonjs",
    }
);

parser = parser.replace(/"use strict";/, '"use strict";\nlet apply = require("./apply");');

fs.writeFileSync("./src/parser.js", parser);
fs.writeFileSync("./out/parser.js", parser);
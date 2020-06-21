
const { readFileJson, writeFileJson } = require("./lib/fileMethods");

const ParseRecords = require("./lib/parseRecords");
const { exists } = require("fs-extra");

console.log(process.argv);
if (process.argv && process.argv.length < 4)
{
    console.log("Invalid argumaents");
    return;
}

const inputFileLocation = process.argv[2];
const outputFileLocation = process.argv[3];

// Read file data as json
let inputData;
try {
    inputData = readFileJson(inputFileLocation);
} catch (error) {
    console.log(error);
}
if (inputData) {
    const parseRecords = new ParseRecords(inputData);
    if (parseRecords.validate()) {
        console.log("Validation passed");
        const processedRecords = parseRecords.process();
        console.log(processedRecords);

        const result = {
            data: processedRecords
        };
        writeFileJson(outputFileLocation, JSON.stringify(result));
    }
    else {
        console.log("Validation failed, exiting.....");
    }
}
else{
    console.log("error reading the input file");
}


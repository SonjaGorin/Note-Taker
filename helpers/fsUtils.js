const fs = require("fs");
const util = require("util");

// reading the data from file, it returns a promise
const readFromFile = util.promisify(fs.readFile);

// writing object to file
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

// adding data to file. First file is read, then new data is added to the array and then file is written
const addToJsonFile = (content, file) => {
    readFromFile(file, 'utf8')
        .then ((data) => {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        });
};

module.exports = { readFromFile, writeToFile, addToJsonFile };
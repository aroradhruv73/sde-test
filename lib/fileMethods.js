const path = require('path');
const fs = require('fs-extra')

exports.readFileJson = function(filePath){
    try {
        const rawdata = fs.readFileSync(filePath);
        const jsonData = JSON.parse(rawdata);
        return jsonData;
    } catch (error) {
        throw error;
    }
}

exports.writeFileJson = function(filePath, data){
    try {
        if (!fs.existsSync(filePath)) {
            console.log("output folder doesn't exists, creating");
            const outputFolder = path.parse(filePath).dir;
            fs.mkdirSync(outputFolder);
        }
        fs.writeFileSync(filePath, data);
    } catch (error) {
        throw error;
    }
}
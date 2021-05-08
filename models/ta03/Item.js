const fs = require('fs');
const path = require('path');

const dataPath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'ta03',
    'items.json'
);

module.exports = class Item {

    static getAllItems(callback) {
        fs.readFile(dataPath, (err, fileContent) => {
            if (err) return callback([]);
            return callback(JSON.parse(fileContent));
        });
    }

}
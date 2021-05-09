const fs = require('fs');
const path = require('path');

const dataPath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'team-data',
    'team-03',
    'items.json'
);

module.exports = class Item {

    constructor() { }

    static getAllItems(callback) {
        fs.readFile(dataPath, (err, fileContent) => {
            if (err) return callback([]);
            return callback(JSON.parse(fileContent));
        });
    }


    static getItemsByTag(tag, callback) {
        this.getAllItems(items => {

            const taggedItems = items.filter(item => {
                return item.tags.includes(tag)
            })

            return callback(taggedItems)
        })
    }

}
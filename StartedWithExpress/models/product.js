const fs = require("fs");
const path = require("path");
const directory = require("../util/path.js");

//path to save and fetch product
const p = path.join(directory,
    'data',
    'products.json'
);
// const products = []

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    //To save the data
    save() {
        // products.push(this);
        fs.readFile(p, (err, content) => {
            let products = [];
            if (!err) {
                products = JSON.parse(content);
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    //return all the products
    static fetchAll(cb) {

        // const product = fs.readFile(__dirname)
        fs.readFile(p, (err, content) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(content));
        })
        // return products;
    }
}
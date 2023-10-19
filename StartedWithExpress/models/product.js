const fs = require("fs");
const path = require("path");
const directory = require("../util/path.js");

//path to save and fetch product
const p = path.join(directory,
    'data',
    'products.json'
);

//additional utility function to read file
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, content) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(content));
        }
    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    //To save the data
    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    //return all the products
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
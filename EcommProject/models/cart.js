const path = require("path");
const fs = require("fs");

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {

    static addProduct(id, productPrice) {
        //check the id if exist then increase quantity else add product
        fs.readFile(p, (err, content) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err && content.length > 0) {
                cart = JSON.parse(content);
            }

            //look for existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);

            const existingProduct = cart.products[existingProductIndex];
            let UpdatedProduct;

            //add new product
            if (existingProduct) {
                UpdatedProduct = { ...existingProduct };
                UpdatedProduct.qty = UpdatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = UpdatedProduct;
            } else {
                UpdatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, UpdatedProduct];
            }

            cart.totalPrice = cart.totalPrice + productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        })
    }
}
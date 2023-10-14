const db = require('../util/database.js')

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //used this way to protect it from sql injection
    return db.execute(
      'INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)',
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static fetchAll() {
    return db.execute(`SELECT * FROM products`);
  }

  static deleteById(id) {
    return db.execute(`DELETE FROM products WHERE products.id = ?`, [id]);
  }

  static findById(id) {
    return db.execute(`SELECT * FROM products WHERE products.id = ?`, [id]);
  }
};

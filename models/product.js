const cart = require('./cart')
const db = require('../util/database')

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute("INSERT INTO products (title, imageURL, description, price) VALUES (?, ?, ?, ?)",
    [this.title, this.imageUrl, this.description, this.price])
  }

  static deleteById(id){
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id){
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id])
  }
};

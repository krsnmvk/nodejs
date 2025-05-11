import { join } from 'node:path';
import { getDirname } from '../utils/path.js';
import { readFile, writeFile } from 'node:fs';
import { Cart } from './cart.product.js';

const dataPath = join(
  getDirname(import.meta.url),
  '..',
  'data',
  'product.json'
);

const getProductsFromFile = (cb) => {
  readFile(dataPath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

export class Product {
  constructor(id, title, image, price, description) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProduct = [...products];

        updatedProduct[existingProductIndex] = this;

        writeFile(dataPath, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();

        products.push(this);

        writeFile(dataPath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static getAll(cb) {
    getProductsFromFile(cb);
  }

  static getById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);

      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);

      const updatedProducts = products.filter((prod) => prod.id !== id);

      writeFile(dataPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
}

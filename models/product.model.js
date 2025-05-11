import { join } from 'node:path';
import { getDirname } from '../utils/path.js';
import { readFile, writeFile } from 'node:fs';

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
  constructor(title, image, price, description) {
    this.title = title;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();

    getProductsFromFile((products) => {
      products.push(this);
      writeFile(dataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
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
}

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getDirname } from '../utils/path.js';

const dataPath = join(
  getDirname(import.meta.url),
  '..',
  'data',
  'product.json'
);

export class Product {
  constructor(title) {
    this.title = title;
  }

  async save() {
    let products = [];

    try {
      const file = await readFile(dataPath, 'utf8');
      products = JSON.parse(file);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    products.push(this);

    await writeFile(dataPath, JSON.stringify(products, null, 2));
  }

  static async getAll() {
    try {
      const file = await readFile(dataPath, 'utf8');
      return JSON.parse(file);
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }
}

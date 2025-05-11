import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getDirname(url) {
  return dirname(fileURLToPath(url));
}

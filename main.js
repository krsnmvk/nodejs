import express from 'express';
import bodyParser from 'body-parser';
import adminRoute from './routes/admin.route.js';
import shopRoute from './routes/shop.route.js';
import { join } from 'node:path';
import { getDirname } from './utils/path.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(getDirname(import.meta.url), 'src')));

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(join(getDirname(import.meta.url), 'views', '404.html'));
});

app.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});

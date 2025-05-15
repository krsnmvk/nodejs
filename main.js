import express from 'express';
import bodyParser from 'body-parser';
import adminRoute from './routes/admin.route.js';
import shopRoute from './routes/shop.route.js';
import { join } from 'node:path';
import { getDirname } from './utils/path.js';
import { dbConnection } from './db/db.js';
import { UserModel } from './models/user.model.js';

const app = express();

dbConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(getDirname(import.meta.url), 'src')));

app.set('view engine', 'ejs');
app.set('views', join(getDirname(import.meta.url), 'views'));

app.use((req, res, next) => {
  UserModel.findById('68259e177b738f32f4b0a665')
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found', href: '/404' });
});

app.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import csrf from 'csurf';
import flash from 'connect-flash';
import authRoute from './routes/auth.route.js';
import adminRoute from './routes/admin.route.js';
import shopRoute from './routes/shop.route.js';
import { join } from 'node:path';
import { getDirname } from './utils/path.js';
import { dbConnection } from './db/db.js';
import { UserModel } from './models/user.model.js';

const app = express();

dbConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'af8CM95D/zVddrgcKx/nep+b45n6QggEVvzG7x+bwH8=',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://typescript97:typescript97@cluster0.wbe8zlc.mongodb.net/nodejs?retryWrites=true&w=majority&appName=Cluster0',
      collectionName: 'sessions',
    }),
  })
);
app.use(csrf({}));
app.use(flash());
app.use(express.static(join(getDirname(import.meta.url), 'src')));

app.set('view engine', 'ejs');
app.set('views', join(getDirname(import.meta.url), 'views'));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  UserModel.findById(req.session.user._id)
    .then((user) => {
      if (!user) return next();

      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  next();
});

app.use(authRoute);
app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found', href: '/404' });
});

app.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});

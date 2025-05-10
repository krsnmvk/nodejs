const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/admin.route');
const shopRoute = require('./routes/shop.route');
const { join } = require('node:path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(join(__dirname, 'views', '404.html'));
});

app.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const passport = require("passport");
const session = require("express-session");
const orders = require('./routes/orders');
const products = require('./routes/products');
const defaultRoute = require('./routes/default');
const auth = require("./routes/auth");
require('dotenv').config();
//const cart = require('./routes/cart');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static('../client/public/product_images'));

/* function generateRandom() {
  // Generate a random number between 100 and 999
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });
 */

app.use('/auth', auth);
app.use('/orders', orders);
app.use('/products', products);
app.use('/', defaultRoute);

app.listen(3000, function(req, res){
  console.log('Server set on port 3000');
});








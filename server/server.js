const { sampleData } = require("../data/tables/sampleData");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { connectToDatabase } = require("./database/database");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static('../client/public/product_images'));

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/product_images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });

let connection;

connectToDatabase().then((conn) => {
  connection = conn;
  app.listen(3000, function () {
    console.log("Server set on port 3000");
  });
});

app.get("/orders", function (req, res) {
  res.setHeader("content-Type", "application/json");
  res.json({ tableData: sampleData });
});

app.get("/products", function (req, res) {
  async function fetchProducts() {
    const result = await connection.execute(`select * from products`);
    console.log(result.rows);
    return result;
  }

  fetchProducts()
    .then((dbRes) => {
      res.json(dbRes.rows);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/products", upload.single("image"), function (req, res) {
  const uploadedFile = req.file;
  const prodData = req.body;

  let imgPath = uploadedFile.path.substring(16);
  console.log(prodData);
  console.log(imgPath);

  async function addProduct() {
    const binds = {
      product_id: prodData.pid,
      product_name: prodData.pname,
      price: prodData.price,
      product_img: imgPath,
      quantity: prodData.quantity,
      brand: prodData.brand,
      category: prodData.category,
      supplier_id: prodData.supplier_id,
    };

    const sql = `insert into products values(:product_id, :supplier_id, :product_name, :brand, :category, :quantity, :price, :product_img)`;

    const result = await connection.execute(sql, binds, {
      autoCommit: true,
    });

    return result;
  }

  addProduct()
    .then((dbRes) => {
      res.redirect("http://localhost:5173/products");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/productUpdate/:pid", function (req, res) {
  const pid = req.params.pid;
  const body = req.body.prodData;

    console.log(body);
    console.log(pid);

  async function updateProduct() {
    const binds = {
      product_id: pid,
      product_name: body.pname,
      price: body.price,
      brand: body.brand,
      quantity: body.quantity,
    };

    const sql = `update products set product_name=:product_name, cost_price=:price, brand=:brand, quantity=:quantity where product_id=:product_id`;

    try {
      const result = await connection.execute(sql,binds, {
        autoCommit: true,
      });
      console.log('success');
      res.json({success:true});
    } catch (err) {
      console.error(err);
      res.send(err);
    }

  }

  updateProduct();
});

app.post("/productDelete/:pid", function(req,res){
    const pid = req.params.pid;

    async function deleteProduct()
    {
        const sql = `delete from products where product_id=:pid`;

        try{
            const result = await connection.execute(sql,[pid],{
                autoCommit:true,
            });
            console.log(result);
            res.json({success:true});
        }
        catch(err){
            console.error(err);
            res.send(err);
        }
    }

    deleteProduct();
});

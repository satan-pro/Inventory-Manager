const express = require('express');
const {connectToDatabase} = require('../database/database');
const multer = require("multer");
const bodyParser = require('body-parser');

let connection;
connectToDatabase().then((conn)=>{
    connection=conn;
});

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/static/product_images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });


router.get("/", function (req, res) {
    async function fetchProducts() {
      const [result] = await connection.execute('select * from products');
      return result;
    }
  
    fetchProducts()
      .then((dbRes) => {
        res.json(dbRes);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  

  router.post("/", upload.single("image"), function (req, res) {
    const uploadedFile = req.file;
    const prodData = req.body;
  
    let imgPath = uploadedFile.path.substring(16);
    console.log(prodData);
    console.log(imgPath);
  
    async function addProduct() {
      const binds = [
        prodData.pid,
        prodData.supplier_id,
        prodData.pname,
        prodData.brand,
        prodData.category,
        prodData.quantity,
        prodData.price,
        imgPath 
      ];
  
      const sql = `insert into products values(?,?,?,?,?,?,?,?)`;
  
      const result = await connection.execute(sql, binds);
      connection.config.autoCommit=true;
      return result;
    }
  
    addProduct()
      .then((dbRes) => {
        res.redirect("https://inbiz.vercel.app/home/products");
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  router.post("/update/:pid", function (req, res) {
    const pid = req.params.pid;
    const body = req.body.prodData;
  
    console.log(body);
    console.log(pid);
  
    async function updateProduct() {
      const binds = [
        body.pname,
        body.price,
        body.brand,
        body.quantity,
        pid
      ];
  
      const sql = `update products set product_name=?, cost_price=?, brand=?, quantity=? where product_id=?`;
  
      try {
        const [result] = await connection.execute(sql, binds);
        connection.config.autoCommit=true;
        console.log("success");
        res.json({ success: true });
      } catch (err) {
        console.error(err);
        res.send(err);
      }
    }
  
    updateProduct();
  });
  
  router.post("/delete/:pid", function (req, res) {
    const pid = req.params.pid;
  
    async function deleteProduct() {
      const sql = `delete from products where product_id=?`;
  
      try {
        const result = await connection.execute(sql, [pid]);
        connection.config.autoCommit=true;
        console.log(result);
        res.json({ success: true });
      } catch (err) {
        console.error(err);
        res.send(err);
      }
    }
  
    deleteProduct();
  });
  
  router.get("/query/:query", function (req, res) {
    const query = req.params.query;
    
    let sql;
    let binds = [];
    if (query === "category") {
      sql = `select product_category from products group by product_category`;
    } else if (query === "supplier") {
      sql = `select supplier_name from supplier`;
    }
  
    async function returnQuery() {
      try {
        const [result] = await connection.execute(sql, binds);
        return result;
      } catch (err) {
        console.log(err);
      }
    }
  
    returnQuery()
      .then((dbRes) => {
        res.json({ queryRes: dbRes });
        //res.redirect(source);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router.get("/stats", function(req, res){

    let result = {};
    async function getTotalProducts()
    {
      const sql = `select count(*) as prodCount from products`;
  
      const [result] = await connection.execute(sql);
      return result;
    }
  
    async function getTotalOrders()
    {
      const sql = `select count(*) as orderCount from orders`;
  
      const [result] = await connection.execute(sql);
      return result;
    }
  
    async function getPacked()
    {
      const sql = `select count(*) as packed from delivery where status='Packed'`;
  
      const [result] = await connection.execute(sql);
      return result;
    }
  
    async function getShipped()
    {
      const sql = `select count(*) as shipped from delivery where status='Shipped'`;
  
      const [result] = await connection.execute(sql);
      return result;
    }
  
    async function getDelivered()
    {
      const sql = `select count(*) as delivered from delivery where status='Delivered'`;
  
      const [result] = await connection.execute(sql);
      return result;
    }
  
    async function getCategory()
    {
      const sql = `select count(product_id) as items, product_category from products group by product_category`;
  
      const [result] = await connection.execute(sql);
      return result;
    }
  
    async function getPopular()
    {
      const sql = `SELECT product_category FROM ( SELECT p.product_category, COUNT(p.product_id) AS prodCount FROM invoice i JOIN products p ON i.product_id = p.product_id GROUP BY p.product_category ORDER BY prodCount DESC) AS category_counts`;
      
      const [result] = await connection.execute(sql);
  
      return result;
    }
  
    async function getLeastPopular()
    {
      const sql = `SELECT product_category FROM (SELECT p.product_category, COUNT(p.product_id) AS prodCount FROM invoice i JOIN products p ON i.product_id = p.product_id GROUP BY p.product_category ORDER BY prodCount ASC) AS category_counts`;
      
      const [result] = await connection.execute(sql);
  
      return result;
    }
  
    (async()=>{
      const prodCount = await getTotalProducts();
      const orderCount = await getTotalOrders();
      const packedCount = await getPacked();
      const shippedCount = await getShipped();
      const deliCount = await getDelivered();
      const catCount = await getCategory();
      const pop = await getPopular();
      const les = await getLeastPopular();
  
      console.log(les);
  
      result["products"] = prodCount[0]["prodCount"];
      result["orders"] = orderCount[0]["orderCount"];
      result["packed"] = packedCount[0]["packed"];
      result["shipped"] = shippedCount[0]["shipped"];
      result["delivered"] = deliCount[0]["delivered"];
      result["category"] = catCount;
      result["popular"] = pop[0]["product_category"];
      result["least"] = les[0]["product_category"];
      res.json(result);
    })();
  });

  module.exports = router;
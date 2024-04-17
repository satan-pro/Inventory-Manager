const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const oracledb = require('oracledb');
const { connectToDatabase } = require("./database/database");
const { v4: uuidv4 } = require("uuid");
const { autoCommit } = require("oracledb");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static('../client/public/product_images'));

function generateRandom() {
  // Generate a random number between 100 and 999
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

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

let sessionID ="";
let userType="";

connectToDatabase().then((conn) => {
  connection = conn;
  app.listen(3000, function () {
    console.log("Server set on port 3000");
  });
});

app.get("/orders/:orderId", function (req, res) {
  const orderId = req.params.orderId;
  const resultSpecificOrders = [];

  async function getSpecificOrder() {
    const sql = `select * from (orders join (products join invoice using(product_id)) using(order_id)) join customers using(customer_id) join supplier using(supplier_id) where order_id=:orderId`;
    const result = await connection.execute(sql, [orderId]);
    return result.rows;
  }

  async function getTotalPrice() {
    const sql = `select sum(sell_price) as total from orders join invoice using(order_id) group by order_id having order_id=:orderId`;
    const result = await connection.execute(sql, [orderId]);
    return result.rows[0]["TOTAL"];
  }

  async function getDeliveryStatus() {
    const sql = `select status from (orders join customers using(customer_id)) join delivery using(order_id) where order_id=:orderId`;
    const result = await connection.execute(sql, [orderId]);
    return result.rows[0]["STATUS"];
  }

  getSpecificOrder()
    .then((dbRes) => {
      resultSpecificOrders.push(dbRes);
      return getTotalPrice();
    })
    .then((dbRes2) => {
      resultSpecificOrders.push(dbRes2);
      return getDeliveryStatus();
    })
    .then((dbRes3) => {
      res.json({
        orderId: orderId,
        detailedOrders: resultSpecificOrders[0],
        totalPrice: resultSpecificOrders[1],
        orderDate: resultSpecificOrders[0][0]["ORDER_DATE"],
        deliveryStatus: dbRes3,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/orders", function (req, res) {
  async function fetchOrders() {
    const sql = `select * from (orders join customers using(customer_id)) join delivery using(order_id)`;
    const result = await connection.execute(sql);
    return result.rows;
  }

  /*   async function fetchDetailedOrders()
  {
    const sql = `select * from (orders join (products join invoice using(product_id)) using(order_id)) join customers using(customer_id) order by order_id`;
    const result = await connection.execute(sql);
    return result.rows;
  } */

  fetchOrders()
    .then((dbRes) => {
      res.json({ orders: dbRes });
    })
    .catch((err) => {
      res.send(err);
    });
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
      res.redirect("http://localhost:5173/home/products");
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
      const result = await connection.execute(sql, binds, {
        autoCommit: true,
      });
      console.log("success");
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }

  updateProduct();
});

app.post("/productDelete/:pid", function (req, res) {
  const pid = req.params.pid;

  async function deleteProduct() {
    const sql = `delete from products where product_id=:pid`;

    try {
      const result = await connection.execute(sql, [pid], {
        autoCommit: true,
      });
      console.log(result);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }

  deleteProduct();
});

app.get("/productQuery/:query", function (req, res) {
  const query = req.params.query;
  
  let sql;
  let binds = {};
  if (query === "category") {
    sql = `select product_category from products group by product_category`;
  } else if (query === "supplier") {
    sql = `select supplier_name from supplier`;
  }

  async function returnQuery() {
    try {
      const result = await connection.execute(sql, binds);
      return result.rows;
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

app.post("/auth/:loginType", function (req, res) {
  const loginType = req.params.loginType;
  const auth = req.body.authData;
  console.log(auth);
  let binds;

  if (loginType === "register") {
    const uid = ""+generateRandom();
    binds = {
      id: uid,
      name: auth.name,
      contact: auth.email,
      pass: auth.password,
    };

    if (auth.userType === "customer") {
      registerCustomer()
        .then((dbRes) => {
          res.json({success:true})
        })
        .catch((err) => {
          res.send(err);
        });
    } else if (auth.userType === "admin") {
      registerAdmin()
        .then((dbRes) => {
          res.json({success:true})
        })
        .catch((err) => {
          res.send(err);
        });
    }

  } else if (loginType === "login") {
    binds = {
      name: auth.username,
    };

    if(auth.userType==='customer')
    {
      getCustomer().then((dbRes)=>{
        let pass=dbRes;
        console.log(pass);
        //console.log(Object.values(pass[0])[0]);
        if (pass.length>0)
        {
          if(Object.values(pass[0])[1]==auth.password)
          {
            sessionID=Object.values(pass[0])[0];
            userType="customer";
            res.json({success:true, type:'customer'});
          }
          else
          res.json({success:false});
        }
        else{
          res.json({success:false});
        }
      })
    }
    else if(auth.userType==='admin')
    {
      getAdmin().then((dbRes)=>{
        let pass = dbRes;
        console.log(pass);
        if (pass.length>0)
        {
          if(Object.values(pass[0])[1]===auth.password)
          {
            sessionID=Object.values(pass[0])[0];
            userType="admin";
            res.json({success:true, type:'admin'})
          }
          else
            res.json({success:false})
        }
        else{
          res.json({success:false})
        }
      })
    }
  }

  let sqI = `:begin :pass:=:authFunc(); end;`;

  async function getAdmin() {
    const sql = `select admin_id, pass from admins where admin_name=:name`;

    const result = await connection.execute(sql, binds);

    return result.rows;
  }

  async function getCustomer() {
    const sql = `select customer_id, pass from customers where customer_name=:name`;

    const result = await connection.execute(sql, binds);
    return result.rows;
  }

  async function registerCustomer() {
    const sql = `insert into customers values(:id, :name, :contact, :pass)`;

    const result = await connection.execute(sql, binds, {
      autoCommit: true,
    });

    return result;
  }

  async function registerAdmin() {
    const sql = `insert into admins values(:id,:name,:contact,:pass)`;

    const result = await connection.execute(sql, binds, {
      autoCommit: true,
    });

    return result;
  }
});

app.get("/cart/:productId", function(req, res){
  const prodId = req.params.productId;
  
  if(userType==='admin' || sessionID==='')
  {
    res.json({success:false});
  }

  const cartId = "C"+generateRandom();

  const binds={
    customerId : sessionID,
    productId : prodId,
    quant: 1
  }

  const sql = `insert into cart values(:customerId, :productId, :quant)`;

  async function addToCart()
  {
    const result = await connection.execute(sql, binds, {
      autoCommit:true
    });

    return result;
  }

  addToCart().then((dbRes)=>{
    if(dbRes.rowsAffected>=1)
    {
      res.json({success:true});
    }
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.post("/cart", function(req, res){

  if(sessionID==='')
  {
    res.json({success:false});
  }

  const cartData = req.body.cartData;
  let fullName = cartData.fname+" "+cartData.lName;
  let address = cartData.address1+", "+cartData.address2+", "+cartData.pincode;

  const date = new Date();
  const day = date.toLocaleString('en-us',{day:"2-digit"});
  const month = date.toLocaleString('en-us', {month:"2-digit"});
  const year = date.toLocaleString('en-us', {year:"numeric"});

  const currDate = year+"-"+month+"-"+day;

  let agents = ['SwiftCourier', 'SwiftRoute', 'Acme Deliveries', 'Relay Point', 'Parcel Pals', 'ZipLine'];

  const orderId = "O"+generateRandom();
  const deliveryId = "D"+generateRandom();

  async function addOrders()
  {
    const binds={
      orderId:orderId,
      customerId: sessionID,
      orderDate: currDate,
    }

    const sql = `insert into orders values(:orderId, :customerId, TO_DATE(:orderDate,'YYYY-MM-DD'))`;

    const result = await connection.execute(sql,binds,{
      autoCommit:true
    });

    return result;
  }

  async function addDelivery()
  {
    let agentNo = Math.floor(Math.random() * agents.length);

    let deliAgent = agents[agentNo];

    let statusValues = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];

    let statusNo = Math.floor(Math.random()*statusValues.length);
    let currStatus = statusValues[statusNo];

    const binds={
      deliveryId:deliveryId,
      orderId:orderId,
      deliveryAgent: deliAgent,
      status: currStatus,
      deliveryDate : currDate,
      deliveryCharge: 50,
      address:address
    }

    const sql = `insert into delivery values(:deliveryId, :orderId, :deliveryAgent, :status, TO_DATE(:deliveryDate,'YYYY-MM-DD'), :deliveryCharge, :address)`;
    
    const result = await connection.execute(sql,binds,{
      autoCommit:true
    });
    return result;
  
  }
  /*
  console.log(agents); */

  addOrders().then((dbRes)=>{
    console.log(dbRes);
    return addDelivery();
  })
  .then((dbRes)=>{
    if (dbRes.rowsAffected>=1)
    {
      res.json({success:true});
    }
  })
  .catch((err)=>{
    res.send(err);
  })

})

app.get("/placeOrder", function(req, res){
  if(sessionID==='')
  {
    res.json({success:false})
  }

  async function getCartOrders(){
    const sql = `select * from (orders join cart using(customer_id)) join products using(product_id) where customer_id=:customerId`;
  
    const result = await connection.execute(sql,[sessionID]);
    return result.rows;
  }

  async function addInvoice(order)
  {
    let sp = order["COST_PRICE"]+(0.1*order["COST_PRICE"]);
    let binds={
      orderId:order["ORDER_ID"],
      productId:order["PRODUCT_ID"],
      sellPrice:sp,
      quant:order["PRODUCT_QUANTITY"]
    }

    const sql = `insert into invoice values(:orderId, :productId, :sellPrice, :quant)`;

    const result = await connection.execute(sql,binds,{
      autoCommit:true
    });
    return result;
  }

  async function deleteCart()
  {
    const sql = `delete from cart where customer_id=:customerId`;

    const result = await connection.execute(sql,[sessionID],{
      autoCommit:true
    });
    return result;
  }

  (async()=>{
    const orders = await getCartOrders();

    for(const order of orders)
    {
      let result = await addInvoice(order);
      if(result.rowsAffected>=1)
      {
        continue;
      }
      else
      {
        res.json({success:false})
      }
    }

    let result = await deleteCart();
    if(result.rowsAffected>=1)
    {
      res.json({success:true})
    }
  })();
});

app.get("/cart/:sid", function(req, res){
  let sid = req.params.sid;
  if(sid==='')
  {
    res.json({success:false});
  }

  async function getCartData()
  {
    const sql = `select * from cart join products using(product_id) where customer_id=:customerId`;

    const result = await connection.execute(sql,[sid]);
    return result.rows;
  }

  getCartData().then((dbRes)=>{
    res.json({success:true,cartData:dbRes});
  })
  .catch((err)=>{
    res.send(err);
  })
});

app.get("/products/stats", function(req, res){

  let result = {};
  async function getTotalProducts()
  {
    const sql = `select count(*) as prodCount from products`;

    const result = await connection.execute(sql);
    return result.rows;
  }

  async function getTotalOrders()
  {
    const sql = `select count(*) as orderCount from orders`;

    const result = await connection.execute(sql);
    return result.rows;
  }

  async function getPacked()
  {
    const sql = `select count(*) as packed from delivery where status='Packed'`;

    const result = await connection.execute(sql);
    return result.rows;
  }

  async function getShipped()
  {
    const sql = `select count(*) as shipped from delivery where status='Shipped'`;

    const result = await connection.execute(sql);
    return result.rows;
  }

  async function getDelivered()
  {
    const sql = `select count(*) as delivered from delivery where status='Delivered'`;

    const result = await connection.execute(sql);
    return result.rows;
  }

  async function getCategory()
  {
    const sql = `select count(product_id) as items, product_category from products group by product_category`;

    const result = await connection.execute(sql);
    return result.rows;
  }

  async function getPopular()
  {
    const sql = `begin :pop:=popularProd(); end;`;
    
    const result = await connection.execute(sql,{
      pop:{dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40},
    });

    return result.outBinds
  }

  async function getLeastPopular()
  {
    const sql = `begin :les:=leastPopularProd(); end;`;
    
    const result = await connection.execute(sql,{
      les:{dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40},
    });

    return result.outBinds
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

    result["products"] = prodCount[0]["PRODCOUNT"];
    result["orders"] = orderCount[0]["ORDERCOUNT"];
    result["packed"] = packedCount[0]["PACKED"];
    result["shipped"] = shippedCount[0]["SHIPPED"];
    result["delivered"] = deliCount[0]["DELIVERED"];
    result["category"] = catCount;
    result["popular"] = pop["pop"];
    result["least"] = les["les"];
    res.json(result);
  })();
});

app.get("/authUser/:type", function(req, res){
  const type = req.params.type;

  if(type===userType)
  {
    res.json({valid:true})
  }
  else{
    res.json({valid: false});
  }
})
const express = require('express');
const {connectToDatabase} = require('../database/database');
const bodyParser = require('body-parser');

let connection;
connectToDatabase().then((conn)=>{
    connection=conn;
});

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

function generateRandom() {
    // Generate a random number between 100 and 999
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  let sessionID ="";
  let userType="";

  router.post("/auth/:loginType", function (req, res) {
    const loginType = req.params.loginType;
    const auth = req.body.authData;
    console.log(auth);
    let binds;
  
    if (loginType === "register") {
      const uid = ""+generateRandom();
      binds = [
       uid,
       auth.name,
       auth.email,
       auth.password
      ];
  
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
      binds = [
        auth.username,
      ];
  
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
  
    async function getAdmin() {
      const sql = `select admin_id, pass from admins where admin_name=?`;
  
      const [result] = await connection.execute(sql, binds);
  
      return result;
    }
  
    async function getCustomer() {
      const sql = `select customer_id, pass from customers where customer_name=?`;
  
      const [result] = await connection.execute(sql, binds);
      return result;
    }
  
    async function registerCustomer() {
      const sql = `insert into customers values(?, ?, ?, ?)`;
  
      const [result] = await connection.execute(sql, binds);
      connection.config.autoCommit=true;
      return result;
    }
  
    async function registerAdmin() {
      const sql = `insert into admins values(?, ?, ?, ?)`;
  
      const [result] = await connection.execute(sql, binds);
      connection.config.autoCommit=true;
      return result;
    }
  });

  router.get("/auth/authUser/:type", function(req, res){
    const type = req.params.type;
  
    if(type===userType)
    {
      res.json({valid:true})
    }
    else{
      res.json({valid: false});
    }
  });

  router.post("/cart", function(req, res){

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
      const binds=[
        orderId,
        sessionID,
        currDate
      ]
  
      const sql = `insert into orders values(?, ?, ?)`;
  
      const [result] = await connection.execute(sql,binds);
      connection.config.autoCommit=true;
      return result;
    }
  
    async function addDelivery()
    {
      let agentNo = Math.floor(Math.random() * agents.length);
  
      let deliAgent = agents[agentNo];
  
      let statusValues = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];
  
      let statusNo = Math.floor(Math.random()*statusValues.length);
      let currStatus = statusValues[statusNo];
  
      const binds=[
        deliveryId,
        orderId,
        deliAgent,
        currStatus,
        currDate,
        50
      ];
  
      const sql = `insert into delivery values(?, ?, ?, ?, ?, ?)`;
      
      const result = await connection.execute(sql,binds);
      connection.config.autoCommit=true;
      return result;
    
    }
    /*
    console.log(agents); */
  
    addOrders().then((dbRes)=>{
      console.log(dbRes);
      return addDelivery();
    })
    .then((dbRes)=>{
      if (dbRes.affectedRows>=1)
      {
        res.json({success:true});
      }
    })
    .catch((err)=>{
      res.send(err);
    })
  
  });

  router.get("/cart/:productId", function(req, res){
    const prodId = req.params.productId;
    
    if(userType==='admin' || sessionID==='')
    {
      res.json({success:false});
    }
  
    const binds=[
      sessionID,
      prodId,
      1
    ];
  
    const sql = `insert into cart values(?,?,?)`;
  
    async function addToCart()
    {
      const [result] = await connection.execute(sql, binds);
      connection.config.autoCommit=true;
      return result;
    }
  
    addToCart().then((dbRes)=>{
      if(dbRes.affectedRows>=1)
      {
        res.json({success:true});
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  });

  router.get("/cart/customer/:sid", function(req, res){
    let sid = req.params.sid;
    if(sid==='')
    {
      res.json({success:false});
    }
  
    async function getCartData()
    {
      const sql = `select * from cart join products using(product_id) where customer_id=?`;
  
      const [result] = await connection.execute(sql,[sid]);
      return result;
    }
  
    getCartData().then((dbRes)=>{
      res.json({success:true,cartData:dbRes});
    })
    .catch((err)=>{
      res.send(err);
    })
  });
  

  router.get("/cart/placeOrder", function(req, res){
    if(sessionID==='')
    {
      res.json({success:false})
    }
  
    async function getCartOrders(){
      const sql = `select * from (orders join cart using(customer_id)) join products using(product_id) where customer_id=?`;
    
      const [result] = await connection.execute(sql,[sessionID]);
      return result;
    }
  
    async function addInvoice(order)
    {
      let sp = order["cost_price"]+(0.1*order["cost_price"]);
      let binds=[
        order["order_id"],
        order["product_id"],
        sp,
        order["product_quantity"]
      ];
  
      const sql = `insert into invoice values(?,?,?,?)`;
  
      const [result] = await connection.execute(sql,binds);
      connection.config.autoCommit=true;
      return result;
    }
  
    async function deleteCart()
    {
      const sql = `delete from cart where customer_id=?`;
  
      const [result] = await connection.execute(sql,[sessionID]);
      connection.config.autoCommit=true;
      return result;
    }
  
    (async()=>{
      const orders = await getCartOrders();
  
      for(const order of orders)
      {
        let result = await addInvoice(order);
        if(result.affectedRows>=1)
        {
          continue;
        }
        else
        {
          res.json({success:false})
        }
      }
  
      let result = await deleteCart();
      if(result.affectedRows>=1)
      {
        res.json({success:true})
      }
    })();
  });

  module.exports = router;
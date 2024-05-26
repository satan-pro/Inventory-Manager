const express = require('express');
const {connectToDatabase} = require('../database/database');

let connection;
connectToDatabase().then((conn)=>{
    connection=conn;
});

const router = express.Router();

router.get("/", function (req, res) {
    async function fetchOrders() {
      const sql = `select * from (orders join customers using(customer_id)) join delivery using(order_id)`;
      const [result] = await connection.execute(sql);
      return result;
    }
  
    fetchOrders()
      .then((dbRes) => {
        res.json({ orders: dbRes });
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router.get("/:orderId", function (req, res) {
    const orderId = req.params.orderId;
    const resultSpecificOrders = [];
  
    async function getSpecificOrder() {
      const sql = `select * from (orders join (products join invoice using(product_id)) using(order_id)) join customers using(customer_id) join supplier using(supplier_id) where order_id=?`;
      const [result] = await connection.execute(sql, [orderId]);
      return result;
    }
  
    async function getTotalPrice() {
      const sql = `select sum(sell_price) as total from orders join invoice using(order_id) group by order_id having order_id=?`;
      const [result] = await connection.execute(sql, [orderId]);
      return result;
    }
  
    async function getDeliveryStatus() {
      const sql = `select status from (orders join customers using(customer_id)) join delivery using(order_id) where order_id=?`;
      const [result] = await connection.execute(sql, [orderId]);
      return result;
    }
  
      try{
         getSpecificOrder().then((dbRes)=>{
          resultSpecificOrders.push(dbRes)
          return getTotalPrice().then((dbRes2)=>{
            resultSpecificOrders.push(dbRes2)
            return getDeliveryStatus().then((dbRes3)=>{
              res.json({
                orderId: orderId,
                detailedOrders: resultSpecificOrders[0],
                totalPrice: resultSpecificOrders[1],
                deliveryStatus: dbRes3,
              });
            })
          })
         });
      }
      catch(err)
      {
        res.send(err);
      }
      
  });

  module.exports = router;
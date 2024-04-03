const {sampleData} = require('../data/tables/sampleData');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const {connectToDatabase} = require('./database/database');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storageConfig = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"../data/product_images");
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname);
    }
});
const upload = multer({storage: storageConfig});

let connection;

connectToDatabase().then((conn)=>{
    connection=conn;
    app.listen(3000, function(){
        console.log("Server set on port 3000")
    });
});

app.get("/orders", function(req, res){
    res.setHeader('content-Type', 'application/json');
    res.json({tableData:sampleData});
});

app.get("/products", function(req, res){
   
    async function fetchProducts()
    {
        const result = await connection.execute(`select * from products`);
        console.log(result.rows);
        return result;
    }

    fetchProducts().then((dbRes)=>{
        res.json(dbRes.rows);
    })
    .catch(err=>{
        res.send(err);
    })
});

app.post("/products", upload.single('image'), function(req, res){
    const uploadedFile = req.file;
    const prodData = req.body;

    console.log(prodData);
    console.log(uploadedFile);

    async function addProduct()
    {
        const binds={
            product_id:prodData.pid,
            product_name:prodData.pname,
            price:prodData.price,
            product_img:uploadedFile.path,
            quantity:prodData.quantity,
            brand:prodData.brand
        };

        const sql = `insert into products values(:product_id, :product_name, :price, :product_img, :quantity, :brand)`;

        const result = await connection.execute(sql,binds,{
            autoCommit: true}
        );

        return result;

    }

    addProduct().then(dbRes=>{
        res.json(dbRes.lastRowid);
    })
    .catch(err=>{
        res.send(err);
    });
});
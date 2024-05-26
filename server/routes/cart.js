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



module.exports = router;
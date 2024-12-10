const express = require('express');
const session = require("express-session");
const {connectToDatabase} = require('../database/database');
const bodyParser = require('body-parser');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

let connection;
connectToDatabase().then((conn)=>{
    connection=conn;
});

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser((user, done)=>{
    // the id has to be the same from the database
    done(null, user.customer_id);
});

passport.deserializeUser(async (customer_id, done)=>{
    // using the customer_id from the customers table
    try{
        const sql = `select * from customers where customer_id = ?`;
        const [rows] = await connection.execute(sql, [customer_id]);
        if(rows.length>0) {
            done(null, rows[0]);
        }
        else {
            done(null, null);
        }
    }
    catch(err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/inbiz",
  },
  async function(accessToken, refreshToken, profile, done) {
    // using done() as the callback function
    try{
        const sql = `select * from customers where customer_id=?`;
        const [rows] = await connection.execute(sql, [profile.id]);

        if(rows.length>0)
        {
            // User already exists
            return done(null, rows[0]);
        }
        else {
            // Create new user
            const sql = `insert into customers(customer_id, customer_name) values(?,?)`;
            const [result] = await connection.execute(sql, [profile.id, profile.displayName]);

            const sql2 = `select * from customers where customer_id=?`;
            const [newUser] = await connection.execute(sql2, [result.insertId]);
            return done(null, newUser[0]);
        }
    }
    catch(err) {
        console.error(err);
        return done(err, null);
    }
  }
));

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/google/inbiz", passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('http://localhost:5173/');
});

router.get("/verify", async function(req, res) {
    const sql = `select * from customers`;
    const [rows] = await connection.execute(sql);
    res.json(rows);
});

module.exports = router;
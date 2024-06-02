const mysql = require('mysql2/promise');
require('dotenv').config();
//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
/* async function connectToDatabase()
{
    try{
        const connection = await oracledb.getConnection({
            user:"satan",
            password:"123",
            connectString:"localhost/xe"
        });
        return connection;
    }
    catch(error)
    {
        return error;
    }
}

module.exports={
    connectToDatabase : connectToDatabase
} */
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  let connection;

  async function connectToDatabase() {
    connection = await pool.getConnection();
    return connection;
  }

module.exports={
    connectToDatabase : connectToDatabase,
    getConnection : async function(){
        if(!connection)
            {
                connection = await connectToDatabase;
            }
            return connection;
    }
};
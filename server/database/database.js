const mysql = require('mysql2/promise');
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
    host: 'localhost',
    user: 'satan',
    password: '1234',
    database: 'satan',
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
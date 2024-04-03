const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
async function connectToDatabase()
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
}
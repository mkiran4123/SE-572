let DB_URL = "mongodb://localhost:27017/mydb";

if(process.env.MONGO_DB_URL){
    DB_URL = process.env.MONGO_DB_URL;
}

module.exports = {DB_URL}
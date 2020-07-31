const app = require("./src/app");
const mongoose = require("mongoose");
const { DB_URL } = require("./src/config");

mongoose.connect(DB_URL);

app.listen(3000, ()=> {
    console.log("Running on 3000");
});



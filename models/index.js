const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.MONGO_URL;

const db = {};
db.mongoose = mongoose;
db.url = url;

db.user = require("./user.js")(mongoose);
db.contribute = require("./contribute.js")(mongoose);

module.exports = db;
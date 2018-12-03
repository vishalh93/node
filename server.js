ex=require("express");
app=ex();
app.use(ex.static(__dirname));
app.listen(1234);
console.log("Started.....1234");
var bp = require("body-parser");
app.use(bp.json());
 var mongo = require("mongojs");
 conn = mongo("mongodb://localhost:27017/E-commerce");

app.use(ex.static('src/assets/image')); 

var category = require("../Admin/service file/category_ser");
var subcategory = require("../Admin/service file/subcategory_ser");
var subsubcat = require("../Admin/service file/subsubcat_ser");
var brand = require("../Admin/service file/brand_ser");
var products = require("../Admin/service file/product_ser");

app.use("/catapi",category);
app.use("/subapi",subcategory);
app.use("/subsubapi",subsubcat);
app.use("/brandapi",brand);
app.use("/productapi",products);

var express = require("express");
app = express();

var exp_upd = require("express-fileupload");
app.use(exp_upd());

app.use(express.static(__dirname));
app.listen(4444);
console.log("Started...4444");
// ////////////////////////////////////////



app.post("/img_service",function(req,res){
    mtype = req.files.f1.mimetype;
    // console.log("mtype is"+mtype);
    
    if(mtype == "image/png" || mtype == "image/jpeg")
    {
    upd = req.files.f1;
    upd_fname = req.files.f1.name;
    timestamp = new Date()/1000;
    upd_fname = timestamp + "_" +upd_fname;

//====================================   create image folder path ========================================

            upd.mv("src/assets/image/" +upd_fname,function(err,result){
                if(err){
                    res.send("Error");
                }
                else{
                    res.redirect("http://localhost:4200/product;sendimg="+upd_fname);
                }
        }); 
    }else{
        res.send("error.........");
    } 
});




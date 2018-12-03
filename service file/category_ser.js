var exp = require("express");
var router = exp.Router();
// ======================================deleting ===============================================
router.post("/deleting",function(req,res){
    data = req.body;
    conn.category.remove(data,function(err,result){
        res.send("Delete successfully...!");
    });
});

// ======================================saving =================================================
router.post("/saving",function(req,res){
    data = req.body;
    conn.category.update(data[0],{$set:data[1]},function(err,result){
        res.send("Update Successfully...!");
    });
});
// ===================================get categry ================================================
router.get("/getcat",function(req,res){
    conn.category.find(function(err,result){
        res.send(result);
    });
});

// ==============================insert category ==================================================
router.post("/insertcategory",function(req,res){
    catdata = req.body;
conn.category.find({},{_id:1}).sort({_id:-1}).limit(1,function(err,result){
    if(result==0)
    val=0;
    else
    val=result[0]._id;
    val++;
    conn.category.save({_id:val,catname:catdata.catname, active:1},function(err,result){
        res.send("Insert Successfully....!");
    });
});
});






module.exports = router;
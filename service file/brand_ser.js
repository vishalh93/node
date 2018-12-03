var express = require("express");
var router = express.Router();
// =====================================deliting ===============================================
router.post("/deliting",function(req,res){
    data = req.body;
    conn.brand.remove(data,function(err,result){
        res.send("Removing success....!");
    });
});
// ======================saving=================================================================
router.post("/saving",function(req,res){
    data = req.body;
    conn.brand.update(data[0],{$set:data[1]},function(err,result){
        res.send("Updated....!");
    });
});


// ========================sub sub catategory ==================================================
router.post("/ssubcat",function(req,res){
    ssdata = req.body;
    conn.subsubcat.find(ssdata,function(err,result){
        res.send(result);
    });
});
// ===============================get all brand records =========================================
router.get("/getallbrand",function(req,res){
    conn.brand.find(function(err,brd_result){
        conn.subsubcat.find(function(err,ssc_result){
            conn.subcat.find(function(err,sc_result){
                conn.category.find(function(err,cat_result){
                    arr = [];
                    for(a=0; a<brd_result.length; a++){
                        for(b=0; b<ssc_result.length; b++){
                            for(c=0; c<sc_result.length; c++){
                                for(d=0; d<cat_result.length; d++){
                                    if(brd_result[a].catid == cat_result[d]._id && brd_result[a].sscatid == ssc_result[b]._id && brd_result[a].scatid == sc_result[c]._id){
                                        var brd = brd_result[a];
                                        brd.sscatname = ssc_result[b].sscatname;
                                        brd.scatname = sc_result[c].scatname;
                                        brd.catname = cat_result[d].catname;
                                        arr.push(brd);
                                    }
                                }
                            }
                        }
                    }
                   // console.log(arr);
                   res.send(arr);
                });
            });
        });
    });
});
// =======================================insert brand ==========================================
router.post("/insbrands",function(req,res){
    bdata = req.body;
    // console.log(bdata);
    conn.brand.find({},{_id:1}).sort({_id:-1}).limit(1,function(err,result){
        if(result==0)
        val=0;
        else
        val=result[0]._id;
        val++;
        conn.brand.save({_id:val, catid:bdata.catid, scatid:bdata.scatid, sscatid:bdata.sscatid, brand_name:bdata.brand_name, active:1},function(err,bresult){
            res.send("Insert Brand Succ..!");
        });
    }); 
});

// ======================================get subsub category record =============================
router.post("/getssc",function(req,res){
    data = req.body;
    conn.subsubcat.find(data,function(err,result){
        res.send(result);
    });
});


module.exports = router;
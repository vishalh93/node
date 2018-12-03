express = require("express");
router = express.Router();
// =============================================================================================
router.post("/addoffer",function(req,res){
    offdata = req.body;
   //  console.log(offdata);
    conn.product.update(offdata[0],{$set:offdata[1]});
    res.send("Offer Added Succ.....!");
});


// ============================== Image Uploade =================================================


router.post("/img_send",function(req,res){
    img_recieve = req.body;
   // console.log(img_recieve);
    conn.product.find({},{_id:1}).sort({_id:-1}).limit(1,function(err,result){
        var lastid = result[0]._id;
    conn.product.update({_id:lastid},{$set:{product_image:img_recieve.product_image}});
    });
});

// ===============================deleting ======================================================
router.post("/deleting",function(req,res){
    deldata = req.body;
    conn.product.remove(deldata,function(err,result){
        res.send("delete succ...!");
    });
});
// ===============================saving ========================================================
router.post("/saving",function(req,res){
    savedata = req.body;
    conn.product.update(savedata[0],{$set:savedata[1]},function(err,result){
        res.send("Update Succ...!");
    });
});

// ==============================re get brand record with the help of change ====================
router.post("/getbrand",function(req,res){
    data = req.body;
    conn.brand.find(data,function(err,brd){
     res.send(brd);
 });
});
// ================================get product record ==========================================
router.get("/get_productrec",function(req,res){
    conn.product.find(function(err,pro){
        conn.brand.find(function(err,brd){
            conn.subsubcat.find(function(err,ssc){
                conn.subcat.find(function(err,sc){
                    conn.category.find(function(err,cat){
                        arr = [];
                        for(a=0; a<pro.length; a++){
                            for(b=0; b<brd.length; b++){
                                for(c=0; c<ssc.length; c++){
                                    for(d=0; d<sc.length; d++){
                                        for(e=0; e<cat.length; e++){
                                            if(pro[a].catid==cat[e]._id && pro[a].scatid==sc[d]._id && pro[a].sscatid==ssc[c]._id && pro[a].brd_id==brd[b]._id){
                                                var prec = pro[a];
                                                prec.brand_name = brd[b].brand_name;
                                                prec.sscatname = ssc[c].sscatname;
                                                prec.scatname = sc[d].scatname;
                                                prec.catname = cat[e].catname;
                                                arr.push(prec);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                       res.send(arr);
                    });
                });
            });
        });
    });
});
// ========================insert product ===============================
router.post("/ins_product",function(req,res){
    pdata = req.body;
    conn.product.find({},{_id:1}).sort({_id:-1}).limit(1,function(err,result){
        if(result==0)
        val=0;
        else
        val=result[0]._id;
        val++;
        conn.product.save({
            _id:val, catid:pdata.catid, 
            scatid:pdata.scatid, 
            sscatid:pdata.sscatid, 
            brd_id:pdata.brd_id, 
            product_name:pdata.product_name,
            product_rating:pdata.product_rating,
            product_color:pdata.product_color,
            product_price:pdata.product_price,
            product_quantity:pdata.product_quantity,
            description:pdata.description,
             active:1},function(err,result){
            res.send("Insert Product Success...!");
        });
    });
});


// ===========================get brand =================================
router.post("/getbrand",function(req,res){
    bdata = req.body;
    // console.log(bdata);
    conn.brand.find(bdata,function(err,result){
        res.send(result);
//console.log(result);
    }); 
});


module.exports =router;
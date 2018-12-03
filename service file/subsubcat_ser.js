var express = require("express");
var router = express.Router();
// ===================================== deliting ==========================================================
router.post("/deliting",function(req,res){
    data = req.body;
    conn.subsubcat.remove(data,function(err,result){
        res.send("Removing success....!");
    });
});

// ======================================saving ============================================================
router.post("/saving",function(req,res){
    savdata = req.body;
    conn.subsubcat.update(savdata[0],{$set:savdata[1]},function(err,result){
        res.send("Update succ....!");
    });
});
// ===================================re get subcategory ====================================================
router.post("/reget_subsub",function(req,res){
    data = req.body;
   // console.log(data);
    conn.subcat.find(data,function(err,result){
        res.send(result);
    });
});
// =============================get all sub subcategory======================================================
router.get("/getallssc",function(req,res){
    conn.subsubcat.find(function(err,ssc_result){
        conn.subcat.find(function(err,sc_result){
            conn.category.find(function(err,cat_result){
                arr=[];
                for(i=0; i<ssc_result.length; i++)
                {
                    for(j=0; j<sc_result.length; j++)
                    {
                        for(k=0; k<cat_result.length; k++)
                        {
                            if(ssc_result[i].scatid==sc_result[j]._id && ssc_result[i].catid==cat_result[k]._id)
                            {
                                var rec=ssc_result[i];
                                rec.catname=cat_result[k].catname;
                                rec.scatname=sc_result[j].scatname;
                                arr.push(rec);
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









// =================================insert sub subcategory ========================================================
router.post("/ins_sscat",function(req,res){
    insdata=req.body;
    conn.subsubcat.find({},{_id:1}).sort({_id:-1}).limit(1,function(err,result){
        if(result==0)
        val=0;
        else
        val=result[0]._id;
        val++;
        conn.subsubcat.save({
            _id:val,
            catid:insdata.catid,
            scatid:insdata.scatid,
            sscatname:insdata.sscatname,
            active:1
        },function(err,iresult){
            res.send("Insert Ok");
        });
    });
});
// =====================================getsubcategory with the help of change function ============================
router.post("/getsubcategory",function(req,res){
    sdata = req.body;
    conn.subcat.find(sdata,function(err,result){
        res.send(result);
    });
});





module.exports=router;
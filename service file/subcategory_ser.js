var express = require("express");
var router = express.Router();

// ==========================deleting==========================================

router.post("/deleting",function(req,res){
    data = req.body;
    conn.subcat.remove(data,function(err,result){
        res.send(result);
    });
});






// ==========================saving or updating=================================
router.post("/saving",function(req,res){
    data = req.body;
  //  console.log(data);
    conn.subcat.update(data[0],{$set:data[1]},function(err,result){
       // console.log(result);
         res.send("Save...!");
    });
});





// ========================get subcat================================
router.get("/subcat",function(req,res){
    conn.subcat.find(function(err,subresult){
        conn.category.find(function(err,catresult){
            arr =[];
            for(i=0; i<subresult.length; i++)
            {
                for(j=0; j<catresult.length; j++)
                {
                    if(subresult[i].catid == catresult[j]._id){
                        var srec = subresult[i];
                        srec.catname = catresult[j].catname;
                        arr.push(srec);
                    }
                }
            }
//            console.log(arr);
            res.send(arr);
        });
    });
});






// ==============================inssubcat ==============================
router.post("/inssubcat",function(req,res){
    data = req.body;
   // console.log(data);
    conn.subcat.find({},{_id:1}).sort({_id:-1}).limit(1,function(err,result){
        if(result==0)
        val=0;
        else
        val=result[0]._id;
        val++;
        conn.subcat.save({_id:val, catid:data.catid, scatname:data.scatname,active:1},function(err,sresult){
     //       console.log(sresult);
            res.send("Insert Sub Category .....!");
        });
    });
});
module.exports =router;
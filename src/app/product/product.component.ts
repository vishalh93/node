import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public http:Http, public actrout:ActivatedRoute) { 
    this.getcategory();
    this.getproducts();
  }

  ngOnInit() {
  var namestore;
  this.actrout.params.subscribe(params=>{
    if(params["sendimg"]){
      namestore = params["sendimg"];
      console.log(namestore);
      var img_post = {product_image:namestore}
     // alert(img_send_serv)
      this.http.post("productapi/img_send",img_post).subscribe(function(){
        alert("Image Uploade Success...!")
      })
    }
  })
  }

// ========================= offerFun ===================================================
poffer;
offerFun(offer){
this.glob_id = offer;
}
saveOfferFun(){
  var oldoff = {_id:this.glob_id}
  var newoff = {product_offer:this.poffer}
  var arr = [oldoff,newoff]
  this.http.post("productapi/addoffer",arr).subscribe(this.cboff)
}
cboff=(dt)=>{
  alert(dt._body)
  this.glob_id=0;
}




  glob_id=0;
  // =========================================sorting ==================================
  key ="product_name";
  ord =false;
  proSorting(pn){
    this.key = pn;
    this.ord =! this.ord;
  }
  // ========================================deleteFun =================================
  deleteFun(del){
    var delobb= {_id:del}
    this.http.post("productapi/deleting",delobb).subscribe(this.cbdel)
  }
  cbdel=(dt)=>{
    alert(dt._body);
    this.getproducts();
  }
  // ========================================= brandChange ==============================
  rebrand_rec;
  brandChangeFun(){
    var brobb= {sscatid:this.ssid1};
    this.http.post("productapi/getbrand",brobb).subscribe(this.cbgetbrand)
  }
  cbgetbrand=(dt)=>{
    this.rebrand_rec= JSON.parse(dt._body);
  }
  // ===========================================updssubcat() ============================
ssubrec;
updssubcat(){
  var sscobb = {scatid:this.sid1};
  this.http.post("brandapi/ssubcat",sscobb).subscribe(this.cbssc)
}
cbssc=(dt)=>{
  this.ssubrec = JSON.parse(dt._body);
 // alert(dt._body);
}
  // =========================================updsubcategory change =================
  subrec;
  updsubcat(){
    var catobb = {catid:this.cid1}
    this.http.post("subsubapi/reget_subsub",catobb).subscribe(this.re_subsub)
  }
  re_subsub=(dt)=>{
    this.subrec = JSON.parse(dt._body);
   // alert(this.subrec);
  }  

// =================================editFun =============================================
cid1; sid1; ssid1; bid1; pname1;prating1;pcolor1;pprice1;pdesc1;quantity1;
  editFun(p){
    this.glob_id = p._id;
    this.cid1 = p.catid;
    this.sid1 = p.scatid;
    this.ssid1= p.sscatid;
    this.bid1 = p.brd_id;
    this.pname1 = p.product_name;
    this.prating1 = p.product_rating;
    this.pcolor1 = p.product_color;
    this.pprice1 = p.product_price;
    this.quantity1 = p.product_quantity;
    this.pdesc1 = p.description;

    this.updsubcat();
    this.updssubcat();
    this.brandChangeFun();
  } 
// ========================================= saving ===================================
  saveFun(){
   var oldobb = {_id:this.glob_id};
   var newobb = {catid:this.cid1, scatid:this.sid1, sscatid:this.ssid1, brd_id:this.bid1, product_name:this.pname1,product_rating:this.prating1,product_color:this.pcolor1,product_price:this.pprice1,description:this.pdesc1}
   var arr = [oldobb,newobb]
   this.http.post("productapi/saving",arr).subscribe(this.cbsave) 
 }
 cbsave=(dt)=>{
   alert(dt._body);
   this.getproducts();
   this.glob_id=0;
 }
   
// ================================= get products =======================================
pro_record;
getproducts(){
  this.http.get("productapi/get_productrec").subscribe(this.getpro)
}
getpro=(dt)=>{
  this.pro_record = JSON.parse(dt._body);
 // alert(this.pro_record);
}
// ==================================insert product =====================================
pname;msg1;msg2;msg3;msg4;msg5;msg6;msg7;msg8;msg10;msg9;
bid="";
prating; pcolor ;pprice;pdesc;quantity;
insProducts(vld){
  if(vld.valid){
  var proob ={catid:this.cid, scatid:this.sid, sscatid:this.ssid, brd_id:this.bid, product_name:this.pname ,product_rating:this.prating, product_color:this.pcolor , product_price:this.pprice,product_quantity:this.quantity, description:this.pdesc}
  this.http.post("productapi/ins_product",proob).subscribe(this.cbpro)
  }else{
    this.msg1="Please Enter the Catgry";
    this.msg2="Please Enter the SubCat"
    this.msg3="Please Enter the ssuCat"
    this.msg4="Please Enter the Brands";
    this.msg5="Please Enter the P Name"
    this.msg6="Please Enter the rating";
    this.msg7="Please Enter the pcolor";
    this.msg8="Please Enter the pprice";
    this.msg9="Please Enter the Quantity";
    this.msg10="Please Enter description";
  }
}
cbpro=(dt)=>{
  alert(dt._body);
  this.cid="";
  this.sid="";
  this.ssid="";
  this.bid="";
  this.pname="";
  this.prating="";
  this.pcolor="";
  this.pprice="";
  this.quantity="";
  this.pdesc ="";
  this.getproducts();

  var img = <HTMLFormElement>document.getElementById("frm1")
  alert(img);
  img.submit();
}
// ====================================brandChange() ====================================
ssid=""; brand_rec;
brandChange(){
  var brdobb= {sscatid:this.ssid}
  this.http.post("productapi/getbrand",brdobb).subscribe(this.cbbrand)
}
cbbrand=(dt)=>{
  this.brand_rec = JSON.parse(dt._body)
}

 // ====================================subsubCahnge() ================================
 sid="";
 ssub_record;
 subsubCahnge(){
   var ssobb = {scatid:this.sid}
   this.http.post("brandapi/getssc",ssobb).subscribe(this.cb_getssc)
 }
 cb_getssc=(dt)=>{
   this.ssub_record = JSON.parse(dt._body);
  // alert(this.ssub_record);
 } 
// =====================================subcat() changefun ============================
cid="";
sub_record;
subcat(){
  var obb = {catid:this.cid}
  this.http.post("subsubapi/getsubcategory", obb).subscribe(this.cbsubcat)
}
cbsubcat=(dt)=>{
 // alert(dt._body);
  this.sub_record = JSON.parse(dt._body);
  this.getcategory();
} 
  // ============================================get category =========================== 
  catdata;
  getcategory(){
    this.http.get("catapi/getcat").subscribe(this.cbgetcat)
  }
  cbgetcat=(dt)=>{
    this.catdata = JSON.parse(dt._body);
    // alert(this.catdata);
  }

}

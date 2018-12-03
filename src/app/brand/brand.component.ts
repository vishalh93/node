import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(public http:Http) {
    this.getcategory();
   }

  ngOnInit() {
  }
  // ================================ sorting ========================================
  key="brand_name";
  ord=false;
  brandSorting(brdcol){
    this.key = brdcol;
    this.ord =! this.ord;
  }
 // =================================deleteFun ========================================
 deleteFun(bid){
   var bidobb = {_id:bid}
   this.http.post("brandapi/deliting",bidobb).subscribe(this.cbdeleting)
 } 
 cbdeleting=(dt)=>{
   alert(dt._body);
   this.getBrand();
   this.glob_id=0;
 }
// ===========================================updssubcat() ============================
ssubrec;
updssubcat(){
  var sscobb = {scatid:this.sid1};
  // alert(sscobb)
  this.http.post("brandapi/ssubcat",sscobb).subscribe(this.cbssc)
}
cbssc=(dt)=>{
  this.ssubrec = JSON.parse(dt._body);
 // alert(dt._body);
}
// =========================================updsubca change =================
  subrec;
  updsubcat(){
    var catobb = {catid:this.cid1}
    //alert(catobb);
    this.http.post("subsubapi/reget_subsub",catobb).subscribe(this.re_subsub)
  }
  re_subsub=(dt)=>{
    this.subrec = JSON.parse(dt._body);
    alert(this.subrec);
  }  
// ===================================Edit / Save =====================================
glob_id=0;
cid1; sid1; ssid1; bname1;
editFun(bd){
  this.glob_id = bd._id;
  this.cid1 = bd.catid;
  this.sid1 = bd.scatid;
  this.ssid1 = bd.sscatid;
  this.bname1 = bd.brand_name;
  this.updsubcat();
  this.updssubcat();
}

saveFun(){
  var oldobb = {_id:this.glob_id};
 var newobb = {catid:this.cid1, scatid:this.sid1, sscatid:this.ssid1, brand_name:this.bname1};
 var arr = [oldobb,newobb];
 this.http.post("brandapi/saving",arr).subscribe(this.cbsaving)
}
cbsaving=(dt)=>{
  alert(dt._body);
  this.getBrand();
  this.glob_id=0;
}



// ================================== get all brand relative records ==================
show_allrec;
getBrand(){
  this.http.get("brandapi/getallbrand").subscribe(this.getallbrd)
}
getallbrd=(dt)=>{
this.show_allrec = JSON.parse(dt._body)
// alert(this.show_allrec);
} 
 // =================================insert brand =====================================
 bname;
 ssid="";
 insBrand(){
   var brdobb = {catid:this.cid, scatid:this.sid, sscatid:this.ssid, brand_name:this.bname}
   this.http.post("brandapi/insbrands",brdobb).subscribe(this.insbrd)
 }
 insbrd=(dt)=>{
   alert(dt._body);
   this.getBrand();
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
    this.catdata =JSON.parse(dt._body);
    // alert(this.catdata);
    
    this.getBrand();
  }


}

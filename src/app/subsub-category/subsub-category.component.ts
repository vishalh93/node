import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-subsub-category',
  templateUrl: './subsub-category.component.html',
  styleUrls: ['./subsub-category.component.css']
})
export class SubsubCategoryComponent implements OnInit {

  constructor(public http:Http) {
    this.getcategory();
    this.allsscategory();
   }

  ngOnInit() {
  }
  glob_id=0;
  // ===================================sorting =======================================
  key="scatname";
  ord=false;
  subSorting(scn){
    this.key=scn;
    this.ord =! this.ord;
  }
// ===================================deleteFun ======================================
deleteFun(ssc){
var sccobb= {_id:ssc}
// console.log(sccobb)
this.http.post("subsubapi/deliting",sccobb).subscribe(this.cbdel)
}
cbdel=(dt)=>{
  alert(dt._body)
  this.allsscategory();
  this.glob_id=0;
}


  // =========================================updsubcat() temp change =================
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
 // =================================== editFun() ===================================== 
 cid1;
 sid1;
 sscname1;
 editFun(ed){
  // alert(ed)
  this.glob_id = ed._id;
  this.cid1 = ed.catid;
  this.sid1 = ed.scatid;
  this.sscname1= ed.sscatname;
  this.updsubcat();
 }

 saveFun(){
   var oldobb = {_id:this.glob_id}
   var newobb = {catid:this.cid1, scatid:this.sid1, sscatname:this.sscname1}
   var arr = [oldobb,newobb]
   this.http.post("subsubapi/saving",arr).subscribe(this.cbsaving)
 }
 cbsaving=(dt)=>{
   alert(dt._body);
   this.getcategory();
   
   this.glob_id=0;
 }

 // =======================================get all sub sub category ===================
 show_all_ssc;
 allsscategory(){
   this.http.get("subsubapi/getallssc").subscribe(this.allssc)
 }
 allssc=(dt)=>{
   this.show_all_ssc= JSON.parse(dt._body);
 }  
// =====================================insert subsub category ========================
sscname;
sid ="";
ins_subsubcategory(){
  var sscobb = {catid:this.cid, scatid:this.sid, sscatname:this.sscname}
  this.http.post("subsubapi/ins_sscat",sscobb).subscribe(this.cbins_ssc)
}
cbins_ssc=(dt)=>{
  alert(dt._body);
  this.allsscategory();
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
}
}

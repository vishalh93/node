import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  constructor(private http:Http) {
    this.getcategory();
    this.getsubcat();
   }

  ngOnInit() {
  }

// ==============================sorting =======================================================
ord = false;
key ="scatname"
subSorting(subsort){
this.key=subsort;
this.ord =! this.ord;
}
// ==================================deleteFun() ==============================================
  
  deleteFun(del){
    var delobb = {_id:del}
    this.http.post("subapi/deleting",delobb).subscribe(this.cbdelete)
  }
  cbdelete=(dt)=>{
  //  alert(dt._body);
    this.getsubcat();
  }

 // ===================================editFun() / saveFun() ====================================
 glob_id = 0;
 cid1;
 scname;
 editFun(sc){
   this.glob_id =sc._id;
   this.cid1 = sc.catid;
   this.scname = sc.scatname;
 }
 



 saveFun(){
   var oldobb= {_id :this.glob_id};
   var newobb= {catid :this.cid1, scatname :this.scname};
   var arr = [oldobb,newobb];
   this.http.post("subapi/saving",arr).subscribe(this.cbsaving)
 }
 cbsaving=(dt)=>{
    alert(dt._body);
    this.getsubcat();
    this.glob_id=0;   
 }

// ========================================get subcategory record ===================
subcat_record;
getsubcat(){
this.http.get("subapi/subcat").subscribe(this.cbgetsubcat)
}
cbgetsubcat=(dt)=>{
  this.subcat_record=JSON.parse(dt._body);
}
// =========================================insert subcategory ======================
cid="";
sname;
ins_succategory(){
  var subobb = {catid:this.cid, scatname:this.sname}
  this.http.post("subapi/inssubcat",subobb).subscribe(this.subcat)
}
subcat=(dt)=>{
  alert(dt._body);
  this.getsubcat();
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


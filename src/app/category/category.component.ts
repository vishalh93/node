import { Component, OnInit } from '@angular/core';
import { Http} from "@angular/http";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public http:Http) { 
    this.getcategory();
  }

  ngOnInit() {
  }

glob_id = 0;
// -------------------------------------sortFun----------------------------------------------------------
ord=false;
sortkey="catname";
sortFun(name){
this.sortkey = name;
this.ord =! this.ord
}
//---------------------------------------------deleteFun -------------------------------------------------
deleteFun(del){
  var delobb = {_id:del}
  this.http.post("catapi/deleting",delobb).subscribe(this.deleting)
}
deleting=(dt)=>{
  alert(dt._body);
  this.getcategory();
}
// ---------------------------------------------saveFun --------------------------------------------------
saveFun(){
  var oldobb = {_id:this.glob_id};
  var newobb = {catname:this.cname1};
  var arr = [oldobb,newobb]
  this.http.post("catapi/saving",arr).subscribe(this.cbsaving)
}
cbsaving=(dt)=>{
  alert(dt._body);
  this.getcategory();
  this.glob_id =0;
} 
// -----------------------------------------------Edit ---------------------------------------------------
cname1;
editFun(ed){
 this.glob_id = ed._id;
 this.cname1 = ed.catname;
}
// -----------------------------------------get category -------------------------------------------------
cat_record;  
getcategory(){
    this.http.get("catapi/getcat").subscribe(this.cb_getcat)
  }
  cb_getcat=(dt)=>{
    this.cat_record = JSON.parse(dt._body)
 //  console.log(this.cat_record);  
  }
// ----------------------------------------insert category ------------------------------------------------ 
  cname;
  insertcategory(){
    var cobb = {catname:this.cname}
    this.http.post("catapi/insertcategory",cobb).subscribe(this.inscat)
  }
  inscat=(dt)=>{
    alert(dt._body);
    this.cname = "";
    this.getcategory();
  }

}

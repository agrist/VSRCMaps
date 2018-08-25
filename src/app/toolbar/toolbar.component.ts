import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}


  public copyrightInfoOpen(event){

    console.log("test");
    let newwindow=window.open('dialog.tmpl.html','testWindow','height=500,width=650');
       if (window.focus) {newwindow.focus()}
       return false;
  }

  public open3d(){
    console.log('3D preview called');
    let newwindow=window.open('../assets/5min.html','testWindow','height=500,width=650');
       if (window.focus) {newwindow.focus()}
       return false;
  }

  }

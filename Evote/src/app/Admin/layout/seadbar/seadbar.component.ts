import { Materiel } from './../../../Models/materiel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seadbar',
  templateUrl: './seadbar.component.html',
  styleUrls: ['./seadbar.component.css']
})
export class SeadbarComponent implements OnInit {
  constructor() {}

  permission: boolean = false;

  ngOnInit(): void {
    // if (localStorage.getItem('permission') == '1') {
    //   this.permission = true;
    // }
  }
}

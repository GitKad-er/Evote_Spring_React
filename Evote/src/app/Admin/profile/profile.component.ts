import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  countUser : boolean = true
  updateUser : boolean = false


  constructor() { }

  ngOnInit(): void {
  }


  onEdit(){
    this.countUser = false
    this.updateUser= true
  }

  onUpdate(){
    this.countUser = true
    this.updateUser= false
  }

  onCancel(){
    this.countUser = true
    this.updateUser= false
  }
  

}

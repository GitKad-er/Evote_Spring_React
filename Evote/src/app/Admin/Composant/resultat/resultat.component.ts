import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../all-user/users.service';
import { ConfirmDialogService } from '../../confirm-dialog.service';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {

  
 
  data: any;
  users: any;
  id: any;
  formValue!: FormGroup;
  dataup: any;
  sniper: boolean = true
  update: boolean = false;
  bt_ajouter: boolean = true;
  ajouter: boolean = false;
  fermer: boolean = false;


  constructor(
    private service: UsersService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.sniper = true
    this.service.getUser().subscribe((res) => {
      this.data = res;
      this.users = this.data.data;
      this.sniper = false
      console.log(this.users);
    });
  }

  deleteData(_id: any) {

    this.confirm
      .confirmDialog('Veuillez cliquer sur OK pour confirmer')
      .afterClosed()
      .subscribe((res) => {
        
        console.log(res);
        if (res) {
          this.sniper = true
          this.service.deleteData(_id).subscribe(
            (res) => {
              this.toastr.success('suppression réussi !');
              this.getUser();
              this.sniper = false
            },
            (err) => {
              this.toastr.error('une erreur produite !', 'veuillez réessayer');
              this.sniper = false
            }
          );
        }
      });
  }

  nouveau() {
    this.ajouter = true;
    this.bt_ajouter = true;
  }

  updateData(row: any) {
    this.update = true;
    this.dataup = row
  }

  ferme() {
    this.update = false;
    this.bt_ajouter = true;
    this.ajouter = false;
    this.fermer = false;
    this.getUser();
  }


}

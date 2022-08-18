import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { FormComponentInterface, FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { FormsClient, IHTMLFormControl } from 'src/app/core/components/dynamic-inputs/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  @Input() upData: any;

  forms = this.formclient.get(138)

  @ViewChild("formvalue") private formvalue!: FormComponentInterface

  constructor(

    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private service: UsersService,
    @Inject(FORM_CLIENT) private formclient: FormsClient ,
    
  ) {}

  ngOnInit(): void {

    console.log(this.upData)
    var that = this;
    setTimeout(function () {
      that.formvalue.setControlValue("username", that.upData.username);
      that.formvalue.setControlValue("email", that.upData.email);
      that.formvalue.setControlValue("lastname", that.upData.details.lastname);
      that.formvalue.setControlValue("firstname",  that.upData.details.firstname);
      that.formvalue.setControlValue("phone", that.upData.details.phone);
      that.formvalue.setControlValue("age", that.upData.details.age);
      that.formvalue.setControlValue("genre", that.upData.details.genre);
      that.formvalue.setControlValue("birthday", that.upData.details.birthday);
      that.formvalue.setControlValue("birth_place", that.upData.details.birth_place);
    }, 1000)
  }


  dataURLtoFile(dataUrl:any, fileName:any){
    var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
   while(n--){
       u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type:mime});
  }

  onSubmit(body: {[prop:string]: any}){
    
    this.service.put(this.upData.id,body).subscribe(
      (res) => {
        this.toastr.success('Sauvegarde réussie !');
      },
      (err) => {
          this.toastr.error('veuillez réessayer svp !', 'une erreur produite');
      }
    );
  }
  onComponentReadyChange(){
  }
}

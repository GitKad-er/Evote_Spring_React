import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { FormComponentInterface, FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { FormsClient, IHTMLFormControl } from 'src/app/core/components/dynamic-inputs/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  forms = this.formclient.get(128)

  @ViewChild("formvalue") private formvalue!: FormComponentInterface

  constructor(

    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private service: UsersService,
    @Inject(FORM_CLIENT) private formclient: FormsClient ,
    
  ) {}

  ngOnInit(): void {
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
    console.log(body);

    var imm : any;
    if(body.profile_image == null || body.profile_image == undefined ){
      imm = undefined;
    }else{
      imm = this.dataURLtoFile(body.profile_image.dataURL,body.profile_image.uuid);
    }

    const formData = new FormData();
    formData.append('username', body.username);
    formData.append('email', body.email);
    formData.append('password', body.password);

    formData.append('perms', body.perms);
    formData.append('firstname', body.firstname);
    formData.append('lastname', body.lastname);
    formData.append('phone', body.phone);
    formData.append('age', body.age);
    formData.append('genre', body.genre);
    formData.append('birthday',body.birthday);
    formData.append('birth_place', body.birth_place);
    formData.append('profile_image', imm);
    formData.append('type', '1');


    console.log(body.perms)
    this.service.post(formData).subscribe(
      (res) => {
        this.toastr.success('Sauvegarde réussie !');
        this.formvalue.reset();
      },
      (err) => {
      
          this.toastr.error('veuillez réessayer svp !', 'une erreur produite');
      }
    );

  }

  onComponentReadyChange(){
  }


  // getOptionParent() {
  //   this.service
  //     .getPermission()
  //     .pipe(
  //       map((state) => {
  //         const { data } = state;
  //         if (!Array.isArray(data)) {
  //           return;
  //         }
  //         let config: IHTMLFormControl | undefined = undefined;
  //         if (this.formvalue) {
  //           config = this.formvalue.getControlConfig('id_parent');
  //         }
  //         if (config) {
  //           config = {
  //             ...config,
  //             clientBindings: undefined,
  //             items: data
  //               .map(
  //                 (value: { label: any; id: any; }) => (({ name: value.label, value: value.id } as ISelectItem)))
  //           } as SelectInput;
  //           this.formvalue.setControlConfig(config);
  //         }

  //       })

  //     ).subscribe()

  // }


}

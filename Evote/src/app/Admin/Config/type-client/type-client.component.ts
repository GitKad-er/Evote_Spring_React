import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormComponentInterface, FORM_CLIENT } from 'src/app/core/components/dynamic-inputs/angular';
import { FormsClient } from 'src/app/core/components/dynamic-inputs/core';
import { ConfirmDialogService } from '../../confirm-dialog.service';
import { TypeClientService } from './TypeClient.service';

@Component({
  selector: 'app-type-client',
  templateUrl: './type-client.component.html',
  styleUrls: ['./type-client.component.css']
})
export class TypeClientComponent implements OnInit {

  forms = this.formclient.get(228)

  @ViewChild("formvalue") private formvalue!: FormComponentInterface

  data: any
  designers: any
  id: any
  selectedValue: any;

  sniper: boolean = false

  Ajouter_post: boolean = false
  showAdd: boolean = true
  showUp: boolean = false
  cansel: boolean = false
  alert: boolean = false
  code: boolean = false


  constructor(
    private service: TypeClientService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private confirm: ConfirmDialogService,
    @Inject(FORM_CLIENT) private formclient: FormsClient
  ) { }

  ngOnInit(): void {

    this.service.get().subscribe((res) => {
      this.data = res
      this.designers = this.data.data
    })

    this.getData()
  }


  getData() {
    this.sniper =true
    this.service.get().subscribe((res) => {
      this.data = res
      this.designers = this.data.data
      this.sniper =false
      console.log(this.designers)
    })

  }

  deleteData(_id: any) {


    this.confirm.confirmDialog('Veuillez cliquer sur OK pour confirmer').afterClosed().subscribe(res => {
      console.log(res)
      if (res) {
        this.sniper =true

        this.service.delete(_id).subscribe(
          (res) => {
            this.toastr.success('suppression réussi !')
            this.getData()
            this.sniper =false

          },
          (err) => {
            this.toastr.error('une erreur produite !', 'veuillez réessayer')
            this.sniper =false
          },
        )
      }

    })


  }



  Edite(row: any) {

    var that = this;
    this.selectedValue=row;
    setTimeout(function () {
      that.formvalue.setControlValue("label", row.label);
    }, 1000)
    this.showAdd = false
    this.showUp = true
    this.cansel = true
    this.code = true
    this.Ajouter_post = true
    this.id = row.id
  }




  Cansel() {
    this.showUp = false
    this.cansel = false
    this.showAdd = true
    this.code = false
    this.formvalue.reset()
    this.selectedValue = ""
    this.Ajouter_post = false
    this.getData()
  }


  Ajouter() {
    this.Ajouter_post = true
  }


  onSubmit(body: { [prop: string]: any }) {
    console.log(body)


    if (this.selectedValue) {

      this.alert = false

      this.service.update(this.id, body).subscribe(
        (res) => {
          this.showAdd = true
          this.showUp = false
          this.cansel = false
          this.toastr.success('modification réussi !')
          this.getData()
          this.formvalue.reset()
          this.Ajouter_post = false
          this.selectedValue = ""

        },
        (err) => {
          this.toastr.error('une erreur produite !', 'veuillez réessayer')
          this.selectedValue = ""

        },
      )

    } else {

      this.service.post(body).subscribe(
        (res) => {
          this.toastr.success('sauvegarde réussi !')
          this.formvalue.reset()
          this.getData()
        },
        (err) => {
          this.toastr.error('une erreur produite !', 'veuillez réessayer')
        },
      )

    }



  }

  onComponentReadyChange() {
  }

}

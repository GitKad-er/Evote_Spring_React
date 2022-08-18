import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/Models/users';
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-up-user',
  template: `
    <div class="clr-col-12">
      <form (ngSubmit)="updateData()" #registerForm="ngForm">
        <div class="clr-row">
          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label class="form-label">
                Nom
                <span class="required-field"></span>
              </label>
              <input
                type="text"
                clrInput
                name="Nom"
                id="Nom"
                #nom="ngModel"
                placeholder=""
                minlength="2"
                [(ngModel)]="users.lastname"
                [ngClass]="{ 'is-invalid': nom.touched && !nom.valid }"
              />
              <div class="invalid-feedback">
                <span *ngIf="nom.errors">2 caractères minimum</span>
              </div>
            </clr-input-container>
          </div>

          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label for="exampleFormControlInput1" class="form-label">
                Prénoms
                <span class="required-field"></span>
              </label>
              <input
                type="text"
                clrInput
                name="firstname"
                id="firstname"
                #firstname="ngModel"
                [(ngModel)]="users.firstname"
                minlength="2"
                [ngClass]="{
                  'is-invalid': firstname.touched && !firstname.valid
                }"
              />
              <div class="invalid-feedback">
                <span *ngIf="firstname.errors">2 caractères minimum</span>
              </div>
            </clr-input-container>
          </div>
        </div>

        <div class="clr-row">
          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label for="exampleFormControlInput1" class="form-label">
                Adresse
                <span class="required-field"></span>
              </label>
              <input
                type="text"
                clrInput
                name="addresse"
                id="addresse"
                placeholder=""
                #addresse="ngModel"
                [(ngModel)]="users.address"
                minlength="2"
                [ngClass]="{
                  'is-invalid': addresse.touched && !addresse.valid
                }"
              />
              <div class="invalid-feedback">
                <span *ngIf="addresse.errors">ce champs est requis</span>
              </div>
            </clr-input-container>
          </div>

          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label for="exampleFormControlInput1" class="form-label">
                Téléphone
                <span class="required-field">(*)</span>
              </label>
              <input
                type="number"
                clrInput
                name="phone"
                id="phone"
                #phone="ngModel"
                [(ngModel)]="users.phone_number"
                required
                [ngClass]="{ 'is-invalid': phone.touched && !phone.valid }"
              />
              <div class="invalid-feedback">
                <span *ngIf="phone.errors">numero incorrect</span>
              </div>
            </clr-input-container>
          </div>
        </div>

        <div class="clr-row">
          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label for="exampleFormControlInput1" class="form-label">
                Date de naissance
                <span class="required-field"></span>
              </label>
              <input
                type="date"
                clrInput
                name="birthday"
                id="birthday"
                placeholder=""
                #birthday="ngModel"
                [(ngModel)]="users.birthday"
                [ngClass]="{
                  'is-invalid': birthday.touched && !birthday.valid
                }"
              />
              <div class="invalid-feedback">
                <span *ngIf="birthday.errors">ce champs est requis</span>
              </div>
            </clr-input-container>
          </div>

          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label for="exampleFormControlInput1" class="form-label">
                Nom d'utilisateur
                <span class="required-field">(*)</span>
              </label>
              <input
                type="text"
                clrInput
                name="username"
                id="username"
                #username="ngModel"
                [(ngModel)]="users.username"
                required
                maxlength="20"
                minlength="3"
                [ngClass]="{
                  'is-invalid': username.touched && !username.valid
                }"
              />
              <div class="invalid-feedback">
                <span *ngIf="username.errors">3 caaractères minimum</span>
              </div>
            </clr-input-container>
          </div>
        </div>

        <div class="clr-row">
          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label for="exampleFormControlInput1" class="form-label">
                Email
                <span class="required-field">(*)</span>
              </label>
              <input
                type="email"
                clrInput
                name="email"
                id="email"
                placeholder=""
                #email="ngModel"
                [(ngModel)]="users.email"
                required
                [ngClass]="{ 'is-invalid': email.touched && !email.valid }"
              />
              <div class="invalid-feedback">
                <span *ngIf="email.errors">ce champs est requis</span>
              </div>
            </clr-input-container>
          </div>

          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label for="exampleFormControlInput1" class="form-label">
                Nouveau Mot de passe
                <span class="required-field"></span>
              </label>
              <input
                type="text"
                clrInput
                placeholder=""
                #email="ngModel"
                [(ngModel)]="users.password"
              />
            </clr-input-container>
          </div>
        </div>
        <br />

        <div class="clr-col-12">
          <button
            class="btn btn-primary"
            type="submit"
            [disabled]="!registerForm.valid"
          >
            <clr-icon shape="pencil" size="20"></clr-icon>
            Modifier
          </button>

          <!-- <button class="btn btn-primary" (click)="cansel()">
              <clr-icon shape="undo" size="25"></clr-icon>
              Annuler
            </button> -->
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class UpUserComponent implements OnInit {
  formValue!: FormGroup;

  @Input() id: any;

  data: any;

  users: Users = new Users();

  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserById();
    console.log('fils de pute');
  }

  getUserById() {
    // this.id = this.route.snapshot.params.id
    this.service.getUserById(this.id).subscribe((res) => {
      this.data = res;
      this.users = this.data.item;
      console.log(this.users);
    });
  }

  updateData() {
    this.service.updateData(this.id, this.users).subscribe(
      (res) => {
        this.toastr.success('modification réussi !');
      },
      (err) => {
        this.toastr.error('une erreur produite !', 'veuillez réessayer');
      }
    );
  }

  cansel() {
    this.router.navigateByUrl('/app/users');
  }
}

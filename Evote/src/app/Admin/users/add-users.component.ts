import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlClassService } from '@clr/angular/forms/common/providers/control-class.service';
import { Users } from 'src/app/Models/users';
import { UsersService } from './users.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-users',
  template: `
    <div class="clr-col-12">
      <form (ngSubmit)="CreateUser()" #registerForm="ngForm">
        <div class="clr-row">
          <div class="clr-col-12 clr-col-sm-6">
            <clr-input-container>
              <label class="form-label">
                Nom
                <span class="required-field"></span>
              </label>
              <input
                type="text"
                name="Nom"
                id="Nom"
                clrInput
                #nom="ngModel"
                placeholder=""
                minlength="2"
                [(ngModel)]="users.lastname"
                [ngClass]="{ 'is-invalid': nom.touched && !nom.valid }"
              />
              <clr-control-error>
                <span *ngIf="nom.errors">2 caractères minimum</span>
              </clr-control-error>
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
                name="firstname"
                id="firstname"
                clrInput
                #firstname="ngModel"
                [(ngModel)]="users.firstname"
                minlength="2"
                [ngClass]="{
                  'is-invalid': firstname.touched && !firstname.valid
                }"
              />
              <clr-control-error>
                <span *ngIf="firstname.errors">2 caractères minimum</span>
              </clr-control-error>
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
                name="addresse"
                id="addresse"
                placeholder=""
                clrInput
                #addresse="ngModel"
                [(ngModel)]="users.address"
                minlength="2"
                [ngClass]="{
                  'is-invalid': addresse.touched && !addresse.valid
                }"
              />
              <clr-control-error>
                <span *ngIf="addresse.errors">ce champs est requis</span>
              </clr-control-error>
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
                min="1"
                maxlength="8"
                name="phone"
                id="phone"
                clrInput
                #phone="ngModel"
                [(ngModel)]="users.phone_number"
                required
                [ngClass]="{ 'is-invalid': phone.touched && !phone.valid }"
              />
              <clr-control-error>
                <span *ngIf="phone.errors">numero incorrect</span>
              </clr-control-error>
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
                name="birthday"
                clrInput
                id="birthday"
                placeholder=""
                #birthday="ngModel"
                [(ngModel)]="users.birthday"
                [ngClass]="{
                  'is-invalid': birthday.touched && !birthday.valid
                }"
              />

              <clr-control-error>
                <span *ngIf="birthday.errors">ce champs est requis</span>
              </clr-control-error>
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
                name="username"
                id="username"
                #username="ngModel"
                clrInput
                [(ngModel)]="users.username"
                required
                maxlength="20"
                minlength="3"
                [ngClass]="{
                  'is-invalid': username.touched && !username.valid
                }"
              />
              <clr-control-error>
                <span *ngIf="username.errors">3 caaractères minimum</span>
              </clr-control-error>
              <!-- <div class="invalid-feedback">
              </div> -->
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
                name="email"
                id="email"
                clrInput
                placeholder=""
                #email="ngModel"
                [(ngModel)]="users.email"
                required
                [ngClass]="{ 'is-invalid': email.touched && !email.valid }"
              />

              <clr-control-error>
                <span *ngIf="email.errors">ce champs est requis</span>
              </clr-control-error>
            </clr-input-container>
          </div>

          <div class="clr-col-6">
            <clr-input-container>
              <label for="exampleFormControlInput1" class="form-label">
                Mot de passe
                <span class="required-field">(*)</span>
              </label>
              <input
                type="text"
                name="password"
                id="password"
                clrInput
                #password="ngModel"
                [(ngModel)]="users.password"
                required
                minlength="8"
                [ngClass]="{
                  'is-invalid': password.touched && !password.valid
                }"
              />

              <clr-control-error>
                <span *ngIf="password.errors">8 caractères requis</span>
              </clr-control-error>
            </clr-input-container>
          </div>
        </div>

        <div class="clr-row">
          <div class="clr-col-6">
            <label class="form-label">
              Profile
              <span class="required-field"></span>
            </label>

            <ngx-dropzone (change)="onSelect($event)" [multiple]="false">
              <ngx-dropzone-label>Image</ngx-dropzone-label>
              <ngx-dropzone-preview
                *ngFor="let f of files"
                [removable]="true"
                (removed)="onRemove(f)"
              >
                <ngx-dropzone-label
                  >{{ f.name }} ({{ f.type }})</ngx-dropzone-label
                >
              </ngx-dropzone-preview>
            </ngx-dropzone>
          </div>

          <div class="clr-col-6">
            <clr-input-container>
              <label class="form-label">
                Role
                <span class="required-field">(*)</span>
              </label>
              <select
                aria-label="Default select example"
                name="pays"
                id="pays"
                #role="ngModel"
                clrInput
                required
                [(ngModel)]="users.role_id"
                [ngClass]="{ 'is-invalid': role.touched && !role.valid }"
              >
                <option *ngFor="let role of roles" value="{{ role.id }}">
                  {{ role.name }}
                </option>
              </select>
              <clr-control-helper>Sélectionner le role</clr-control-helper>

              <clr-control-error>
                <span *ngIf="role.errors">ce champs est requis</span>
              </clr-control-error>
            </clr-input-container>
          </div>
        </div>

        <div class="clr-col-12">
          <button
            class="btn btn-primary"
            type="submit"
            [disabled]="!registerForm.valid"
          >
            <clr-icon shape="backup" size="25"></clr-icon>
            SAUVEGARDER
          </button>

          <!-- <button class="btn btn-primary" (click)="cansel()">
              <clr-icon shape="undo" size="25"></clr-icon>
              RETOUR
            </button> -->
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class AddUsersComponent implements OnInit {
  formGroup: any;
  selectedFile: any;
  data: any;
  roles: any;
  users = new Users();
  showbt: boolean = true;
  files: File[] = [];
  constructor(
    private service: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRole();
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  CreateUser() {
    this.showbt = false;

    const formData = new FormData();
    formData.append('username', this.users.username);
    formData.append('email', this.users.email);
    formData.append('password', this.users.password);
    formData.append('firstname', this.users.firstname);
    formData.append('lastname', this.users.lastname);
    formData.append('address', this.users.address);
    formData.append('phone_number', this.users.phone_number);
    formData.append('birthday', this.users.birthday);
    formData.append('image', this.files[0]);
    formData.append('role_id', this.users.role_id);

    this.service.createUser(formData).subscribe(
      (_res) => {
        this.toastr.success('sauvegarde réussi !');
      },
      (_err) => {
        this.toastr.error('une erreur produite !', 'veuillez réessayer');
      }
    );
  }

  getRole() {
    this.service.getRole().subscribe((res) => {
      this.data = res;
      this.roles = this.data;
      console.log(this.roles);
    });
  }

  cansel() {
    this.router.navigateByUrl('/app/users');
  }

  onSelect(event: any) {
    console.log(event);
    this.files = [];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}

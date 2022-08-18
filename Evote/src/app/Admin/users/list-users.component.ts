import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Users } from 'src/app/Models/users';
import { ConfirmDialogService } from '../confirm-dialog.service';

@Component({
  selector: 'app-list-users',
  template: `
    <div class="app-page-header clr-row">
      <div class="clr-col-sm-12">
        <div class="card">
          <div class="card-header">
            <h2><b>UTILISATEURSS SYSTEME</b></h2>
          </div>
        </div>
      </div>
    </div>

    <div class="app-page-content clr-row">
      <hr />

      <div class="modal" *ngIf="ajouter">
        <div class="modal-dialog modal-xl" role="dialog" aria-hidden="true">
          <div class="modal-content">
            <div class="modal-header">
              <button
                aria-label="Close"
                class="close"
                type="button"
                (click)="ferme()"
              >
                <clr-icon aria-hidden="true" shape="close"></clr-icon>
              </button>
              <h3 class="modal-title">Nouvel Utilisateur</h3>
            </div>
            <div class="modal-body">
             
            </div>
          </div>
        </div>
      </div>

      <div class="app-page-content clr-row">
        <hr />

        <div class="modal" *ngIf="ajouter">
          <div class="modal-dialog modal-xl" role="dialog" aria-hidden="true">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  aria-label="Close"
                  class="close"
                  type="button"
                  (click)="ferme()"
                >
                  <clr-icon aria-hidden="true" shape="close"></clr-icon>
                </button>
                <h3 class="modal-title">Nouvel Utilisateur</h3>
              </div>
              <div class="modal-body">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" aria-hidden="true" *ngIf="ajouter"></div>

        <!-- Modification d'un utilisateur -->
        <div class="modal" *ngIf="update">
          <div class="modal-dialog modal-lg" role="dialog" aria-hidden="true">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  aria-label="Close"
                  class="close"
                  type="button"
                  (click)="ferme()"
                >
                  <clr-icon aria-hidden="true" shape="close"></clr-icon>
                </button>
                <h3 class="modal-title">Modification d'un utilisateur</h3>
              </div>
              <div class="modal-body">
                <app-up-user [id]="id_update"></app-up-user>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" aria-hidden="true" *ngIf="update"></div>

        <!-- <clr-modal [(clrModalOpen)]="ajouter" [clrModalSize]="'xl'">
            <div class="modal-header">
                <button aria-label="Close" class="close" type="button">
                    <clr-icon aria-hidden="true" shape="close"></clr-icon> lolo
                </button>
                <h3 class="modal-title">I have a nice title</h3>
            </div>
        <h3 class="modal-title">I have a nice title</h3>
        <div class="modal-body">
          <app-add-users></app-add-users>
        </div>
        <div class="modal-footer">

        </div>
      </clr-modal> -->

        <!-- <clr-modal [(clrModalOpen)]="update" *ngIf="id_update">
        <h3 class="modal-title">I have a nice title</h3>
        <div class="modal-body">
          <app-up-user [id]="id_update"></app-up-user>
        </div>
        <div class="modal-footer"></div>
      </clr-modal> -->

        <!-- <div class="clr-col-12" *ngIf="ajouter">
        <app-add-users></app-add-users>
      </div> -->

        <!-- <div class="clr-col-12" *ngIf="update">
        <app-up-user [id]="id_update"></app-up-user>
      </div> -->

        <div class="clr-col-12">
          <div class="clr-row page-content">
            <div class="clr-col-md-12 view-area data-area">
              <div class="table-container">
                <clr-dg-action-bar>
                  <div class="btn-group btn-primary btn-sm">
                    <!-- <a routerLink="/app/add-user"> -->
                    <button
                      type="button"
                      class="btn"
                      *ngIf="bt_ajouter"
                      (click)="nouveau()"
                    >
                      <clr-icon shape="plus-circle" size="20"></clr-icon>
                      Nouveau
                    </button>
                    <!-- </a> -->

                    <button
                      type="button"
                      class="btn"
                      *ngIf="fermer"
                      (click)="ferme()"
                    >
                      <clr-icon shape="plus-circle" size="25"></clr-icon>
                      fermer
                    </button>
                  </div>
                </clr-dg-action-bar>

                <clr-datagrid>
                  <!-- <clr-dg-column>Image</clr-dg-column> -->
                  <clr-dg-column [clrDgField]="'lastname'">Nom</clr-dg-column>
                  <clr-dg-column [clrDgField]="'firstname'">
                    Prénoms
                  </clr-dg-column>
                  <clr-dg-column [clrDgField]="'email'">Email</clr-dg-column>
                  <clr-dg-column [clrDgField]="'role.name'">
                    Status
                  </clr-dg-column>

                  <clr-dg-row
                    *clrDgItems="let user of users"
                    [clrDgItem]="user"
                  >
                    <clr-dg-action-overflow>
                      <!-- <a routerLink="/app/update-user/{{ user.id }}"> -->
                      <button
                        class="btn btn-sm btn-link btn-block"
                        (click)="updateData(user.id)"
                      >
                        <clr-icon shape="pencil" size="20"></clr-icon>
                        Modifier
                      </button>
                      <!-- </a> -->
                      <a (click)="deleteData(user.id)" id="btnLigne">
                        <button class="btn btn-sm btn-link btn-block">
                          <clr-icon shape="trash" size="20"></clr-icon>
                          Supprimer
                        </button>
                      </a>
                    </clr-dg-action-overflow>
                    <!-- <clr-dg-cell
                ><img src="{{ user.image }}" width="80" height="80"
              /></clr-dg-cell> -->
                    <clr-dg-cell>{{ user.lastname }}</clr-dg-cell>
                    <clr-dg-cell>{{ user.firstname }}</clr-dg-cell>
                    <clr-dg-cell>{{ user.email }}</clr-dg-cell>
                    <clr-dg-cell>{{ user.role.name }}</clr-dg-cell>
                  </clr-dg-row>

                  <clr-dg-detail *clrIfDetail="let detail">
                    <clr-dg-detail-body>
                      <h2>DETAILS UTILISATEURS</h2>
                      <hr class="hrLigne" />

                      <!-- <form (ngSubmit)="updateData(detail.id)" #registerForm="ngForm">
                <clr-input-container>
                  <label class="form-label">
                    Nom
                    <span class="required-field"></span>
                  </label>
                  <input
                    type="text"
                    clrInput
                    required
                    value="{{ detail.lastname }}"
                  />
                  <clr-control-error></clr-control-error>
                </clr-input-container>

                <clr-input-container>
                  <label class="form-label">
                    Prenoms
                    <span class="required-field">(*)</span>
                  </label>
                  <input
                    type="text"
                    clrInput
                    required
                    value="{{ detail.firstname }}"
                  />
                  <clr-control-error></clr-control-error>
                </clr-input-container>

                <clr-input-container>
                  <label class="form-label">
                    Adresse
                    <span class="required-field"></span>
                  </label>
                  <input
                    type="text"
                    clrInput
                    required
                    value="{{ detail.addresse }}"
                  />
                  <clr-control-error></clr-control-error>
                </clr-input-container>
                <clr-input-container>
                  <label class="form-label">
                    Telephone
                    <span class="required-field">(*)</span>
                  </label>
                  <input
                    type="text"
                    clrInput
                    required
                    value="{{ detail.phone_number }}"
                  />
                  <clr-control-error></clr-control-error>
                </clr-input-container>
                <clr-input-container>
                  <label class="form-label">
                    Username
                    <span class="required-field">(*)</span>
                  </label>
                  <input
                    type="text"
                    clrInput
                    required
                    value="{{ detail.username }}"
                  />
                  <clr-control-error></clr-control-error>
                </clr-input-container>
                <clr-input-container>
                  <label class="form-label">
                    Email
                    <span class="required-field">(*)</span>
                  </label>
                  <input
                    type="text"
                    clrInput
                    required
                    value="{{ detail.email }}"
                  />
                  <clr-control-error></clr-control-error>
                </clr-input-container>
                <clr-input-container>
                  <label class="form-label">
                    Nouveau mot de passe
                    <span class="required-field"></span>
                  </label>
                  <input
                    type="text"
                    clrInput
                    required
                  />
                  <clr-control-error></clr-control-error>
                </clr-input-container>

                <div class="clr-row">
                  <div class="clr-col-lg-6 clr-col-6">
                    <button class="btn btn-primary">Modifier</button>
                  </div>
                  <div class="clr-col-lg-6 clr-col-6">
                    <button
                      class="btn btn-danger"
                      (click)="deleteData(detail.id)"
                    >
                      supprimer
                    </button>
                  </div>
                </div>
              </form> -->

                      <div class="clr-row">
                        <div class="clr-col-sm-12 clr-col-md-9">
                          <table class="table">
                            <tr>
                              <th>Nom</th>
                              <td>
                                {{ detail.lastname }} {{ detail.firstname }}
                              </td>
                            </tr>
                            <tr>
                              <th>Adresse</th>
                              <td>{{ detail.address }}</td>
                            </tr>
                            <tr>
                              <th>Date de naissance</th>
                              <td>{{ detail.birthday }}</td>
                            </tr>
                            <tr>
                              <th>username</th>
                              <td>{{ detail.username }}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{{ detail.email }}</td>
                            </tr>
                            <tr>
                              <th>Téléphone</th>
                              <td>{{ detail.phone_number }}</td>
                            </tr>
                            <tr>
                              <th>Role</th>
                              <td>{{ detail.role.name }}</td>
                            </tr>

                            <tbody></tbody>
                          </table>
                        </div>
                        <div class="clr-col-sm-12 clr-col-md-3">
                          <div class="clr-row">
                            <div class="clr-col-lg-12 clr-col-12">
                              <a href="javascript:void(0)">
                                <div class="card-img">
                                  <img src="{{ detail.image }}" />
                                </div>
                                <div class="card-block">
                                  <p class="card-text">Profil</p>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </clr-dg-detail-body>
                  </clr-dg-detail>

                  <clr-dg-footer>
                    <clr-dg-pagination #pagination [clrDgPageSize]="10">
                      <clr-dg-page-size
                        [clrPageSizeOptions]="[10, 20, 50, 100]"
                      >
                        Utilisateurs par page
                      </clr-dg-page-size>
                      {{ pagination.firstItem + 1 }} -
                      {{ pagination.lastItem + 1 }} ..
                      {{ pagination.totalItems }} utilisateurs
                    </clr-dg-pagination>
                  </clr-dg-footer>
                </clr-datagrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['list-user.component.css'],
})
export class ListUsersComponent implements OnInit {
  data: any;
  users: any;
  id: any;
  formValue!: FormGroup;
  id_update: any;

  update: boolean = false;
  bt_ajouter: boolean = true;
  ajouter: boolean = false;
  fermer: boolean = false;

  user = new Users();

  constructor(
    private service: UsersService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.getUser();

    this.formValue = this.formBuilder.group({
      lastname: [''],
      firstname: [''],
      addresse: [''],
      phone_number: [''],
      username: [''],
      email: [''],
      password: [''],
    });

    this.getUser();
  }

  getUser() {
    this.service.getUser().subscribe((res) => {
      this.data = res;
      this.users = this.data.items;
      console.log(' les users sont', '\n', this.users);
    });
  }

  deleteData(_id: any) {
    this.confirm
      .confirmDialog('Veuillez cliquer sur OK pour confirmer')
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.service.deleteData(_id).subscribe(
            (res) => {
              this.toastr.success('suppression réussi !');
              this.getUser();
            },
            (err) => {
              this.toastr.error('une erreur produite !', 'veuillez réessayer');
            }
          );
        }
      });
  }

  nouveau() {
    this.ajouter = true;
    this.bt_ajouter = true;
  }

  updateData(_id: any) {
    this.id_update = _id;
    this.update = true;
    this.bt_ajouter = true;
  }

  ferme() {
    this.update = false;
    this.bt_ajouter = true;
    this.ajouter = false;
    this.fermer = false;
    this.getUser();
  }
}

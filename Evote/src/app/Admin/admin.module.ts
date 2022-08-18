import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminComponent } from './admin.component'
import { RouterModule, Routes } from '@angular/router'
import { DashbordComponent } from './home/dashbord/dashbord.component'
import { ClarityModule } from '@clr/angular'
import { HttpClientModule } from '@angular/common/http'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderComponent } from './layout/header/header.component'
import { SeadbarComponent } from './layout/seadbar/seadbar.component'
import { HomeComponent } from './home/home.component'
import { ListUsersComponent } from './users/list-users.component'
import { UpUserComponent } from './users/up-user.component'


import { UpdateUsersComponent } from './users/update-users.component'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'



// import modules
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxChartModule } from 'ngx-chart'
import { PipeModule } from './partials/pipe.module'

import {MatDialogModule} from '@angular/material/dialog'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import * as angular from '../core/components/dynamic-inputs/angular'
import { NgxDropzoneModule } from 'ngx-dropzone';



import { AllUserComponent } from './all-user/all-user.component';
import { UpdateUserComponent } from './all-user/update-user/update-user.component'
import { AddUserComponent } from './all-user/add-user/add-user.component';

import { ProfileComponent } from './profile/profile.component';

import { TypeClientComponent } from './Config/type-client/type-client.component';
import { TypeProfileCarteComponent } from './Config/type-profile-carte/type-profile-carte.component';
import { ProfileCarteComponent } from './Config/profile-carte/profile-carte.component';
import { CompagniesComponent } from './Principal/compagnies/compagnies.component';
import { ClientsComponent } from './Principal/clients/clients.component';
import { ElectionComponent } from './Composant/election/election.component';
import { CandidatComponent } from './Composant/candidat/candidat.component';
import { AdministrateursComponent } from './Composant/administrateurs/administrateurs.component';
import { VotantsComponent } from './Composant/votants/votants.component';
import { ResultatComponent } from './Composant/resultat/resultat.component'




export const AdminRoute: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'statistiques', component: HomeComponent },
      { path: 'dashbord', component: DashbordComponent },

      { path: 'add-user', component: AddUserComponent },
      { path: 'users', component: AllUserComponent },
      { path: 'update-user', component: UpUserComponent },

      { path: 'typeclients', component: TypeClientComponent },
      { path: 'typeprofilecartes', component: TypeProfileCarteComponent },
      { path: 'profilecartes', component: ProfileCarteComponent },

      { path: 'profile', component: ProfileComponent },

      { path: 'compagnies', component: CompagniesComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'elections', component: ElectionComponent },
      { path: 'candidats', component: CandidatComponent},
      { path: 'admin', component: AdministrateursComponent},
      { path: 'votant', component: VotantsComponent},
      { path: 'result', component: ResultatComponent}

      
    ],
  },
]


@NgModule({
  declarations: [
    AdminComponent,
    DashbordComponent,
    HeaderComponent,
    SeadbarComponent,
    ListUsersComponent,
    AddUserComponent,
    UpdateUsersComponent,


    HomeComponent,
    UpUserComponent,
 
    ConfirmDialogComponent,

 
    AllUserComponent,
    UpdateUserComponent,

    ProfileComponent,
   

    TypeClientComponent,
    TypeProfileCarteComponent,
    ProfileCarteComponent,
    CompagniesComponent,
    ClientsComponent,
    ElectionComponent,
    CandidatComponent,
    VotantsComponent,
    ResultatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoute),
    ClarityModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    FullCalendarModule,
    NgxChartModule,
    PipeModule,
    MatDialogModule,
    angular.NgxSmartFormModule,
    NgxDropzoneModule
  ],
})
export class AdminModule {}

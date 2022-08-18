import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatutPipe } from './pipes/state.pipe';
import { EtatPipe, stateSock, typeSock } from './pipes/etat.pipe';
import { MopPipe } from './pipes/Mop.pipe';
import { NullorNot } from './pipes/NullorNot.pipe';
import { blobToDataURL, SafeRessourceContentPipe, SafeWebContentPipe } from './pipes/docpipe.pipe';



@NgModule({
  declarations: [
    StatutPipe,EtatPipe,MopPipe,NullorNot,SafeWebContentPipe,SafeRessourceContentPipe,blobToDataURL,stateSock,typeSock
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatutPipe,
    EtatPipe,
    MopPipe,
    NullorNot,
    SafeWebContentPipe,
    SafeRessourceContentPipe,
    blobToDataURL,
    stateSock,
    typeSock
  ]
})
export class PipeModule { }

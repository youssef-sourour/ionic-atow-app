import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssortedPage } from './assorted.page';
import {FivCenterModule, FivIconModule} from '@fivethree/core';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AssortedPage
  }
];

@NgModule({
  imports: [
      ReactiveFormsModule,
      CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      FivIconModule,
      FivCenterModule,
  ],
  declarations: [AssortedPage]
})
export class AssortedPageModule {}

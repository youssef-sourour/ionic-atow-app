import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IfYouDarePage } from './if-you-dare.page';
import {FivCenterModule, FivIconModule} from '@fivethree/core';

const routes: Routes = [
  {
    path: '',
    component: IfYouDarePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      FivIconModule,
      FivCenterModule,
  ],
  declarations: [IfYouDarePage]
})
export class IfYouDarePageModule {}

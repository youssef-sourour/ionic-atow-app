import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HintPage } from './hint.page';
import {FivCenterModule, FivIconModule} from '@fivethree/core';

const routes: Routes = [
  {
    path: '',
    component: HintPage
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
  declarations: [HintPage]
})
export class HintPageModule {}

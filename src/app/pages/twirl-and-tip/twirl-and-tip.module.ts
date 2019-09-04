import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TwirlAndTipPage } from './twirl-and-tip.page';

const routes: Routes = [
  {
    path: '',
    component: TwirlAndTipPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TwirlAndTipPage]
})
export class TwirlAndTipPageModule {}

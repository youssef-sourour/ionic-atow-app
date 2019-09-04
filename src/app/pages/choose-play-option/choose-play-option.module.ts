import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChoosePlayOptionPage } from './choose-play-option.page';

const routes: Routes = [
  {
    path: '',
    component: ChoosePlayOptionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChoosePlayOptionPage]
})
export class ChoosePlayOptionPageModule {}

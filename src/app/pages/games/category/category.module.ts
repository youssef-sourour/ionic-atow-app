import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoryPage } from './category.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage
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
  declarations: [CategoryPage]
})
export class CategoryPageModule { }

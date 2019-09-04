import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {FivIconModule, FivCenterModule} from '@fivethree/core';

import {IonicModule} from '@ionic/angular';

import {DashboardPage} from './dashboard.page';

const routes: Routes = [
    {
        path: '',
        component: DashboardPage
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
    declarations: [DashboardPage]
})
export class DashboardPageModule {
}

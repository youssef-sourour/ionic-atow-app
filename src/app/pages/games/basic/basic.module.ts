import {NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {BasicPage} from './basic.page';
import {FivCenterModule, FivIconModule} from '@fivethree/core';
import {HelperModule} from '../../../helper/helper.module';
import { KeyboardPage } from '../keyboard/keyboard.page';
const routes: Routes = [
    {
        path: '',
        component: BasicPage
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
        HelperModule,
        ReactiveFormsModule

    ],
    exports: [BasicPage],
    declarations: [BasicPage,KeyboardPage],
})
export class BasicPageModule {
}

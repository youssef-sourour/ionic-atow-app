import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditProfilePage } from './edit-profile.page';
var routes = [
    {
        path: '',
        component: EditProfilePage
    }
];
var EditProfilePageModule = /** @class */ (function () {
    function EditProfilePageModule() {
    }
    EditProfilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditProfilePage]
        })
    ], EditProfilePageModule);
    return EditProfilePageModule;
}());
export { EditProfilePageModule };
//# sourceMappingURL=edit-profile.module.js.map
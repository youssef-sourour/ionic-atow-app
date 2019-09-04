import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {AlphabetsKeyboardComponent} from './alphabets-keyboard/alphabets-keyboard.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        AlphabetsKeyboardComponent,
    ],
    exports: [
        AlphabetsKeyboardComponent,
    ]
})
export class HelperModule {
}

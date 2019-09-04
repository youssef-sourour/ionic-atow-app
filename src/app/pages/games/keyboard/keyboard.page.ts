import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-keyboard',
    templateUrl: './keyboard.page.html',
    styleUrls: ['./keyboard.page.scss'],
})
export class KeyboardPage implements OnInit {
    @Output() onSelectLetter: EventEmitter<{ letterSelected: string }>;
    @Input() openKeyboard: boolean;
    @Input() keyObj: Object;
    @Input() chooseHint: Function;


    constructor() {
        this.onSelectLetter = new EventEmitter();
    }

    ngOnInit() {
    }
    selectLetter(letterSelected) {
        this.onSelectLetter.next({ letterSelected });
    }

}

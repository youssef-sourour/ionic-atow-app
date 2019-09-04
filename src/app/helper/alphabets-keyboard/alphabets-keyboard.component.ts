import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alphabets-keyboard',
  templateUrl: './alphabets-keyboard.component.html',
  styleUrls: ['./alphabets-keyboard.component.scss'],
})
export class AlphabetsKeyboardComponent implements OnInit {
  letterSelected:any;
  constructor() { }

  ngOnInit() {}

    setLetter(letterSelected){
    return this.letterSelected = letterSelected;
    }
}

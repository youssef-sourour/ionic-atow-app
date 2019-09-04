import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedLettersPage } from './listed-letters.page';

describe('ListedLettersPage', () => {
  let component: ListedLettersPage;
  let fixture: ComponentFixture<ListedLettersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListedLettersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedLettersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

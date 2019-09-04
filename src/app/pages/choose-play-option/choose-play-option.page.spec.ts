import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePlayOptionPage } from './choose-play-option.page';

describe('ChoosePlayOptionPage', () => {
  let component: ChoosePlayOptionPage;
  let fixture: ComponentFixture<ChoosePlayOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePlayOptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePlayOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

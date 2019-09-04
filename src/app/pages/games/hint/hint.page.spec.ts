import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HintPage } from './hint.page';

describe('HintPage', () => {
  let component: HintPage;
  let fixture: ComponentFixture<HintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HintPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

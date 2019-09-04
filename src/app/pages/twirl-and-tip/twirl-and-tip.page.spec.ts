import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwirlAndTipPage } from './twirl-and-tip.page';

describe('TwirlAndTipPage', () => {
  let component: TwirlAndTipPage;
  let fixture: ComponentFixture<TwirlAndTipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwirlAndTipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwirlAndTipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

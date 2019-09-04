import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfYouDarePage } from './if-you-dare.page';

describe('IfYouDarePage', () => {
  let component: IfYouDarePage;
  let fixture: ComponentFixture<IfYouDarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfYouDarePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfYouDarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

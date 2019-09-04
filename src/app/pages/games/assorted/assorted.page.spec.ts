import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssortedPage } from './assorted.page';

describe('AssortedPage', () => {
  let component: AssortedPage;
  let fixture: ComponentFixture<AssortedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssortedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssortedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

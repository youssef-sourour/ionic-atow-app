import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropPage } from './drop.page';

describe('DropPage', () => {
  let component: DropPage;
  let fixture: ComponentFixture<DropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

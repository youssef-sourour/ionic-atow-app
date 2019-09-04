import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsPage } from './shops.page';

describe('ShopsPage', () => {
  let component: ShopsPage;
  let fixture: ComponentFixture<ShopsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

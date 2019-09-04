import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreePlayPage } from './free-play.page';

describe('FreePlayPage', () => {
  let component: FreePlayPage;
  let fixture: ComponentFixture<FreePlayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreePlayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreePlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

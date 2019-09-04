import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultPage } from './game-result.page';

describe('GameResultPage', () => {
  let component: GameResultPage;
  let fixture: ComponentFixture<GameResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RubrosBancoComponent } from './rubros-banco.component';

describe('RubrosBancoComponent', () => {
  let component: RubrosBancoComponent;
  let fixture: ComponentFixture<RubrosBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubrosBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubrosBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

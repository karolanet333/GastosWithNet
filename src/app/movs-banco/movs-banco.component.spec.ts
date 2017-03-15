/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovsBancoComponent } from './movs-banco.component';

describe('MovsBancoComponent', () => {
  let component: MovsBancoComponent;
  let fixture: ComponentFixture<MovsBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovsBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovsBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

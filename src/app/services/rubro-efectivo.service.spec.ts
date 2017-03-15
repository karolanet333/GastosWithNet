/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RubroEfectivoService } from './rubro-efectivo.service';

describe('RubroEfectivoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RubroEfectivoService]
    });
  });

  it('should ...', inject([RubroEfectivoService], (service: RubroEfectivoService) => {
    expect(service).toBeTruthy();
  }));
});

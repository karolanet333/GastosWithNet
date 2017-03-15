import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  baseUrl: string = "http://localhost:9000/api/";
}

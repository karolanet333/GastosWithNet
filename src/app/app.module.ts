import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import {RouterModule} from '@angular/router';
import {ConfigService} from './config/config.service';

import { AppComponent } from './app.component';
import { RubrosBancoComponent } from './rubros-banco/rubros-banco.component';
import { RubrosEfectivoComponent } from './rubros-efectivo/rubros-efectivo.component';
import { MovsEfectivoComponent } from './movs-efectivo/movs-efectivo.component';
import { MovsBancoComponent } from './movs-banco/movs-banco.component';
import { ResumenComponent } from './resumen/resumen.component';
import { APP_ROUTES } from "app/app.routing";
import { MenuComponent } from './menu/menu.component';
import { RubrosBancoAddComponent } from './rubros-banco/rubros-banco-add/rubros-banco-add.component';
import { RubrosBancoEditComponent } from './rubros-banco/rubros-banco-edit/rubros-banco-edit.component';

import { PaginationModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { Ng2TableDemoComponent } from './ng2-table-demo/ng2-table-demo.component';

/*import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

const signalrConfig = new SignalRConfiguration();
signalrConfig.hubName = 'rubrosBancoHub';
//config.qs = { user: 'donald' };
signalrConfig.url = 'http://localhost:9000/signalr';*/

import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    AppComponent,
    RubrosBancoComponent,
    RubrosEfectivoComponent,
    MovsEfectivoComponent,
    MovsBancoComponent,
    ResumenComponent,
    MenuComponent,
    RubrosBancoAddComponent,
    RubrosBancoEditComponent,
    Ng2TableDemoComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    PaginationModule.forRoot(),
    Ng2TableModule,
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

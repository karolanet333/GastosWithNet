import { RubrosBancoEditComponent } from './rubros-banco/rubros-banco-edit/rubros-banco-edit.component';
import { RubrosBancoAddComponent } from './rubros-banco/rubros-banco-add/rubros-banco-add.component';
import { Routes } from '@angular/router';
import { RubrosBancoComponent } from "app/rubros-banco/rubros-banco.component";
import { RubrosEfectivoComponent } from "app/rubros-efectivo/rubros-efectivo.component";
import { MovsBancoComponent } from "app/movs-banco/movs-banco.component";
import { MovsEfectivoComponent } from "app/movs-efectivo/movs-efectivo.component";
import { ResumenComponent } from "app/resumen/resumen.component";

export const APP_ROUTES: Routes = [
    {path: 'rubros-banco', component: RubrosBancoComponent, children:[
        {path: 'add', component: RubrosBancoAddComponent},
        {path: 'edit', component: RubrosBancoEditComponent}
    ]},
    {path: 'rubros-efectivo', component: RubrosEfectivoComponent},
    {path: 'movs-banco', component: MovsBancoComponent},
    {path: 'movs-efectivo', component: MovsEfectivoComponent},
    {path: 'resumen', component: ResumenComponent},
    {path: '', redirectTo: 'resumen', pathMatch: 'full'}
];


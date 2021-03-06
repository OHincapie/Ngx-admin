import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {SmartTableComponent} from './smart-table/smart-table.component'
import { TreeGridComponent } from './tree-grid/tree-grid.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'usuarios',
      component: UsuariosComponent,
    },
    {
      path: 'p',
      component: SmartTableComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  UsuariosComponent,
  SmartTableComponent,
  TreeGridComponent,
];

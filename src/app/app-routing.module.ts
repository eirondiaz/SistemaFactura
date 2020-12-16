import { HomeComponent } from './components/home/home.component';
import { FacturaComponent } from './components/factura/factura.component';
import { EditarComponent } from './components/editar/editar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminfacturaComponent } from './components/adminfactura/adminfactura.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent
  },
  {
    path: 'crearfacturas',
    component: FacturaComponent
  },
  {
    path: 'editar/:id',
    component: EditarComponent
  },
  {
    path: 'adminfacturas',
    component: AdminfacturaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

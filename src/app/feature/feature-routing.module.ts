import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products--',
    pathMatch: 'full',
  },
  {
    path: 'products--',
    canActivate: [],
    loadChildren: async () =>
    import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'people--',
    canActivate: [],
    loadChildren: async () =>
      import('./person/person.module').then((m) => m.PersonModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

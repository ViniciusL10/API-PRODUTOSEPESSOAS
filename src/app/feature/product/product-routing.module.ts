import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Produtc } from 'src/app/core/model/product';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

@Injectable()
export class ProductsDataResolver implements Resolve<Produtc[]>{
  constructor(private productsService: ProductsService) {}

  resolve(){
    return this.productsService.all();
  }
}

@Injectable()
export class ProductDataResolver implements Resolve<Produtc>{
  constructor(private productsSerivce: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Produtc> {
      return this.productsSerivce.getOne(route.params['id']);
  }
}

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      entities: ProductsDataResolver,
    },
  },
  {
    path: 'add',
    component: FormComponent,
  },
  {
    path: ':id',
    component: FormComponent,
    resolve: {
      entity: ProductDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductDataResolver, ProductsDataResolver]
})
export class ProductRoutingModule { }

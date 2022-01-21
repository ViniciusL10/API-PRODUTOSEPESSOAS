import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { PersonModule } from '../feature/person/person.module';
import { ProductModule } from '../feature/product/product.module';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    PersonModule,
    ProductModule
  ]
})
export class FeatureModule { }

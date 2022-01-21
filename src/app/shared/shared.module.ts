import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from "./list/ListComponent";
import { FormComponent } from './form/form.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ListComponent, FormComponent]
})
export class SharedModule { }

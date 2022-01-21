import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Produtc } from 'src/app/core/model/product';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'shared-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formTypeLabel: string = "";
  formProducts = new FormGroup({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formProducts = this.formBuilder.group({
      id:'',
      name:'',
      imageurl:'',
      departament:'',
      price:'',
      comment:'',
    });

    const hasId = Boolean(this.activatedRoute.snapshot.params['id']);

    this.formTypeLabel = hasId ? 'Atualizar' : 'Cadastrar';
  }

  submit(event :Produtc): void{
    this.productsService.upsert(event).subscribe(() => {
      this.router.navigate(['..'],{ relativeTo:this.activatedRoute });
    });
  }
}

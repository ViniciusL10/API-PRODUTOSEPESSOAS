import { Component, OnInit } from '@angular/core';
import { Produtc } from 'src/app/core/model/product';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'shared-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Produtc[] = [];
  headers: string[] = ['Id', 'Name', 'Departament', 'Price', 'Comment'];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void { }

  deleteProduct(event: any): void{
    this.productsService.delete(event.id).subscribe(() => {
      this.productsService.all().subscribe(event.callback);
    });
  }

  searchProduct(event: any){
    this.productsService.all({ limit: event.limit, query: "Música"}).subscribe(event.call);
  }
}

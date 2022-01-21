import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../../model/person';
import { Produtc } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseApi = `${environment.baseApi}/products`;

  constructor(private http: HttpClient) { }

  all(queryParams?: {query?: string; limit?: number}): Observable<Produtc[]>{
    let params = {};

    if(queryParams){
      const {query, limit} = queryParams;

      params = query ? {q: query} : {};
      params = limit ? { ...params, ...{ _limit: limit }}: params;
    }

    return this.http.get<Produtc[]>(this.baseApi, {params});
  }

  getOne(id: number): Observable<Produtc>{
    return this.http.get<Produtc>(`${this.baseApi}/${id}`);
  }

  upsert(product: Produtc){
    if(product.id){
      return this.http.patch<Produtc>(`${this.baseApi}/${product.id}`, product);
    } else {
      return this.http.post<Produtc>(this.baseApi, product);
    }
  }

  delete(id: number): Observable<unknown>{
    return this.http.delete(`${this.baseApi}/${id}`);
  }
}

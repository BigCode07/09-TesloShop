import { Product } from './../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '../interfaces/product.interface';
import { delay, Observable, of, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`; //9-0-''
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit: limit,
          offset: offset,
          gender: gender,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(key, resp))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }
    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(tap((product) => this.productCache.set(idSlug, product)));
  }

  getProductById(id: string): Observable<Product> {
    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }
    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap((product) => this.productCache.set(id, product)));
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>
  ): Observable<Product> {
    return this.http
      .patch<Product>(`${baseUrl}/products/${id}`, productLike)
      .pipe(tap((product) => this.updateProductCache(product)));
  }

  updateProductCache(product: Product) {
    const productoID = product.id;

    this.productCache.set(productoID, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map(
        (currentProduct) => {
          return currentProduct.id === productoID ? product : currentProduct;
        }
      );
    });
    console.log('Cache actualizado');
  }
}

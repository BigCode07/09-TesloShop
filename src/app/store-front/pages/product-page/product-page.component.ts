import { Product } from './../../../products/interfaces/product.interface';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductCarouselComponent } from '../../../products/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  productResource = resource({
    request: () => ({ idSlug: this.productIdSlug }),
    loader: ({ request }) =>
      firstValueFrom(this.productService.getProductByIdSlug(request.idSlug)),
  });
}

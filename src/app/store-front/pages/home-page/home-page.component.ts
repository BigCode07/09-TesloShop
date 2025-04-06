import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductsResponse } from '@/products/interfaces/product.interface';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  // Inyecta el servicio de productos usando la función `inject()` (alternativa al uso de constructor)
  productsService = inject(ProductsService);

  // Método que se ejecuta automáticamente cuando el componente se inicializa
  ngOnInit(): void {
    // Llama al método `getProducts()` del servicio para obtener productos desde el backend
    this.productsService.getProducts().subscribe({
      // Se ejecuta cuando se recibe una respuesta satisfactoria del backend
      next: (resp: ProductsResponse) => {
        // Muestra en consola la respuesta del backend (para depuración o verificación)
        console.log('Respuesta del backend', resp);
      },

      // Se ejecuta si ocurre un error al realizar la petición
      error: (err) => {
        // Muestra en consola el error ocurrido al intentar obtener los productos
        console.error('Error al obtener productos', err);
      },
    });
  }
}

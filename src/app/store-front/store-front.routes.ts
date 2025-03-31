// Importamos las interfaces y componentes necesarios para definir las rutas
import { Routes } from '@angular/router';
import { StoreFrontLayoutComponent } from './layouts/store-front-layout/store-front-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GenderPageComponent } from './pages/gender-page/gender-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

// Definimos las rutas del módulo StoreFront
export const storeFrontRoutes: Routes = [
  {
    // Ruta raíz ('') que usa el layout principal StoreFrontLayoutComponent
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        // Página de inicio que se muestra en la raíz
        path: '',
        component: HomePageComponent,
      },
      {
        // Página que muestra productos según el género (hombre, mujer, etc.)
        path: 'gender/:gender',
        component: GenderPageComponent,
      },
      {
        // Página de detalle de producto usando ID y slug
        path: 'product/:idSlug',
        component: ProductPageComponent,
      },
      {
        // Página 404 para rutas que no existen dentro del layout
        path: '**',
        component: NotFoundPageComponent,
      },
    ],
  },
  {
    // Redirección global para cualquier ruta no reconocida fuera del layout
    path: '**',
    redirectTo: '',
  },
];

// Exportamos las rutas como valor por defecto
export default storeFrontRoutes;

// Importamos la interfaz Routes para definir las rutas
import { Routes } from '@angular/router';

// Definimos el arreglo de rutas principales de la aplicación
export const routes: Routes = [
  {
    // Ruta raíz ('') de la aplicación
    // Carga de forma perezosa (lazy loading) el módulo de rutas del StoreFront
    path: '',
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];

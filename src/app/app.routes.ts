// Importamos la interfaz Routes para definir las rutas
import { Routes } from '@angular/router';
import authRoutes from './auth/auth.routes';

// Definimos el arreglo de rutas principales de la aplicación
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    //TODO Guards
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];

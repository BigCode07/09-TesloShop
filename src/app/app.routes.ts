// Importamos la interfaz Routes para definir las rutas
import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { IsAdminGuard } from './auth/guards/is-admin.guard';

// Definimos el arreglo de rutas principales de la aplicación
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    //TODO Guards
    canMatch: [NotAuthenticatedGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    // canMatch: [IsAdminGuard],
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];

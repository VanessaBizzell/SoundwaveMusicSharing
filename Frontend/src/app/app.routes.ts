import { Routes } from '@angular/router';
import { PostcardComponent } from './postcard/postcard.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./postcard/postcard.component').then(m => m.PostcardComponent),
        title: 'Home Page'
    },
    {
        path: 'music/:id',
        loadComponent: () => import('./postcard/postcard.component').then(m => m.PostcardComponent),
        title: 'Music Details'
      }
];

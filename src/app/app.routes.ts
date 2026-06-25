import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login) 
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { 
        path: 'users', 
        loadComponent: () => import('./features/users/user-list/user-list').then(m => m.UserList) 
      },
      { 
        path: 'users/new', 
        loadComponent: () => import('./features/users/user-add/user-add').then(m => m.UserAdd) 
      },
      { 
        path: 'users/edit/:id', 
        loadComponent: () => import('./features/users/user-edit/user-edit').then(m => m.UserEdit) 
      },
      { 
  path: 'rep-profiles/new', 
  loadComponent: () => import('./features/rep-profiles/rep-profile-add/rep-profile-add').then(m => m.RepProfileAdd) 
},
{ 
  path: 'rep-profiles/edit/:id', 
  loadComponent: () => import('./features/rep-profiles/rep-profile-edit/rep-profile-edit').then(m => m.RepProfileEdit) 
},
      { 
        path: 'rep-profiles', 
        loadComponent: () => import('./features/rep-profiles/rep-profile-list/rep-profile-list').then(m => m.RepProfileList) 
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
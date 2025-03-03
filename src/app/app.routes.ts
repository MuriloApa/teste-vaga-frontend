import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageComponent } from './layout/page/page.component';
import { authGuard } from './guards/auth.guard';
import { UsuariosListComponent } from './pages/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './pages/usuarios/usuarios-create/usuarios-create.component';
import { UsuariosInativosComponent } from './pages/usuarios-inativos/usuarios-inativos.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: PageComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'usuarios',
        children: [
          { path: '', component: UsuariosListComponent },
          { path: 'create', component: UsuariosCreateComponent },
        ],
      },
      {
        path: 'usuarios-inativos',
        component: UsuariosInativosComponent,
      },
      {
        path: 'contatos',
        children: [
          { path: '', component: UsuariosListComponent },
          { path: 'create', component: UsuariosCreateComponent },
        ],
      },
      {
        path: 'contatos-inativos',
        component: UsuariosInativosComponent,
      },
      {
        path: 'tipos',
        children: [
          { path: '', component: UsuariosListComponent },
          { path: 'create', component: UsuariosCreateComponent },
        ],
      },
      {
        path: 'tipos-inativos',
        component: UsuariosInativosComponent,
      },
    ],
  },
];

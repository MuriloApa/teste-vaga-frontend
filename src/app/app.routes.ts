import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageComponent } from './layout/page/page.component';
import { authGuard } from './guards/auth.guard';
import { UsuariosListComponent } from './pages/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './pages/usuarios/usuarios-create/usuarios-create.component';
import { UsuariosInativosComponent } from './pages/usuarios/usuarios-inativos/usuarios-inativos.component';
import { ContatosListComponent } from './pages/contatos/contatos-list/contatos-list.component';
import { ContatosCreateComponent } from './pages/contatos/contatos-create/contatos-create.component';
import { ContatosInativosComponent } from './pages/contatos/contatos-inativos/contatos-inativos.component';
import { TiposListComponent } from './pages/tipos/tipos-list/tipos-list.component';
import { TiposCreateComponent } from './pages/tipos/tipos-create/tipos-create.component';
import { TiposInativosComponent } from './pages/tipos/tipos-inativos/tipos-inativos.component';

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
          { path: '', component: ContatosListComponent },
          { path: 'create', component: ContatosCreateComponent },
        ],
      },
      {
        path: 'contatos-inativos',
        component: ContatosInativosComponent,
      },
      {
        path: 'tipos',
        children: [
          { path: '', component: TiposListComponent },
          { path: 'create', component: TiposCreateComponent },
        ],
      },
      {
        path: 'tipos-inativos',
        component: TiposInativosComponent,
      },
    ],
  },
];

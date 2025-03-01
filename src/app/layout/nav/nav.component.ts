import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-nav',
  imports: [
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  events: string[] = [];
  opened: boolean = false;
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAtivarComponent } from './usuarios-ativar.component';

describe('UsuariosAtivarComponent', () => {
  let component: UsuariosAtivarComponent;
  let fixture: ComponentFixture<UsuariosAtivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosAtivarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosAtivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

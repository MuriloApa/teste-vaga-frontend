import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosDesativarComponent } from './usuarios-desativar.component';


describe('UsuariosDesativarComponent', () => {
  let component: UsuariosDesativarComponent;
  let fixture: ComponentFixture<UsuariosDesativarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosDesativarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosDesativarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

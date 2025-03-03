import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosAtivarComponent } from './contatos-ativar.component';

describe('ContatosAtivarComponent', () => {
  let component: ContatosAtivarComponent;
  let fixture: ComponentFixture<ContatosAtivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatosAtivarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatosAtivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

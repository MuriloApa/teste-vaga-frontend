import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosDesativarComponent } from './contatos-desativar.component';

describe('ContatosDesativarComponent', () => {
  let component: ContatosDesativarComponent;
  let fixture: ComponentFixture<ContatosDesativarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatosDesativarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatosDesativarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

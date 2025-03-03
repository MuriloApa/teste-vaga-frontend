import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosInativosComponent } from './contatos-inativos.component';

describe('ContatosInativosComponent', () => {
  let component: ContatosInativosComponent;
  let fixture: ComponentFixture<ContatosInativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatosInativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatosInativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

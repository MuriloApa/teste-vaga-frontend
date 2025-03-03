import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosCreateComponent } from './contatos-create.component';

describe('ContatosCreateComponent', () => {
  let component: ContatosCreateComponent;
  let fixture: ComponentFixture<ContatosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatosCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

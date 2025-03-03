import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDesativarComponent } from './tipos-desativar.component';

describe('TiposDesativarComponent', () => {
  let component: TiposDesativarComponent;
  let fixture: ComponentFixture<TiposDesativarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposDesativarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDesativarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

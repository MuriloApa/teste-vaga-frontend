import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposAtivarComponent } from './tipos-ativar.component';

describe('TiposAtivarComponent', () => {
  let component: TiposAtivarComponent;
  let fixture: ComponentFixture<TiposAtivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposAtivarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposAtivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

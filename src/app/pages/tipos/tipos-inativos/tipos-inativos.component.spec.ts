import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposInativosComponent } from './tipos-inativos.component';

describe('TiposInativosComponent', () => {
  let component: TiposInativosComponent;
  let fixture: ComponentFixture<TiposInativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposInativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposInativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

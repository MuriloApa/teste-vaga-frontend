import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposListComponent } from './tipos-list.component';

describe('TiposListComponent', () => {
  let component: TiposListComponent;
  let fixture: ComponentFixture<TiposListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

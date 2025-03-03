import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCreateComponent } from './tipos-create.component';

describe('TiposCreateComponent', () => {
  let component: TiposCreateComponent;
  let fixture: ComponentFixture<TiposCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

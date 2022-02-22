import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XomponenteComponent } from './xomponente.component';

describe('XomponenteComponent', () => {
  let component: XomponenteComponent;
  let fixture: ComponentFixture<XomponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XomponenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XomponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

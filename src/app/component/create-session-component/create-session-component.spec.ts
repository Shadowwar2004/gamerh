import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSessionComponent } from './create-session-component';

describe('CreateSessionComponent', () => {
  let component: CreateSessionComponent;
  let fixture: ComponentFixture<CreateSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSessionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

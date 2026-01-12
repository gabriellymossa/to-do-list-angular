import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddListComponent } from './input-add-list.component';

describe('InputAddListComponent', () => {
  let component: InputAddListComponent;
  let fixture: ComponentFixture<InputAddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAddListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

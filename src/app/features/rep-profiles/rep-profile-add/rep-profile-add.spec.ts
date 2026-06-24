import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepProfileAdd } from './rep-profile-add';

describe('RepProfileAdd', () => {
  let component: RepProfileAdd;
  let fixture: ComponentFixture<RepProfileAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepProfileAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepProfileAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

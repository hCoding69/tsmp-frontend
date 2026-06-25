import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepProfileEdit } from './rep-profile-edit';

describe('RepProfileEdit', () => {
  let component: RepProfileEdit;
  let fixture: ComponentFixture<RepProfileEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepProfileEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepProfileEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

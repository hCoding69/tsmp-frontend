import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepProfileList } from './rep-profile-list';

describe('RepProfileList', () => {
  let component: RepProfileList;
  let fixture: ComponentFixture<RepProfileList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepProfileList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepProfileList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

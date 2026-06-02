import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEcosystem } from './main-ecosystem';

describe('MainEcosystem', () => {
  let component: MainEcosystem;
  let fixture: ComponentFixture<MainEcosystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainEcosystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEcosystem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

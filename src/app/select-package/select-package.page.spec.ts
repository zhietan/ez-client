import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectPackagePage } from './select-package.page';

describe('SelectPackagePage', () => {
  let component: SelectPackagePage;
  let fixture: ComponentFixture<SelectPackagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPackagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

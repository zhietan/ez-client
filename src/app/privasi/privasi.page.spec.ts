import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivasiPage } from './privasi.page';

describe('PrivasiPage', () => {
  let component: PrivasiPage;
  let fixture: ComponentFixture<PrivasiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivasiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

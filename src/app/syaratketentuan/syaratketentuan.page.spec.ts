import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SyaratketentuanPage } from './syaratketentuan.page';

describe('SyaratketentuanPage', () => {
  let component: SyaratketentuanPage;
  let fixture: ComponentFixture<SyaratketentuanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyaratketentuanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SyaratketentuanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

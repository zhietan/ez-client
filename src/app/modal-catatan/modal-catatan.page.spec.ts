import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCatatanPage } from './modal-catatan.page';

describe('ModalCatatanPage', () => {
  let component: ModalCatatanPage;
  let fixture: ComponentFixture<ModalCatatanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCatatanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCatatanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

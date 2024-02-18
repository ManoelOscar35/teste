import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoExcluirComponent } from './botao-excluir.component';

describe('BotaoExcluirComponent', () => {
  let component: BotaoExcluirComponent;
  let fixture: ComponentFixture<BotaoExcluirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoExcluirComponent]
    });
    fixture = TestBed.createComponent(BotaoExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

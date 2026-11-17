
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('Sistema de Controle de Estoque do Mercadinho', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('deve criar a aplicação corretamente', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('deve exibir o título do mercadinho', async () => {
    const fixture = TestBed.createComponent(App);

    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const titulo = compiled.querySelector('h1')?.textContent;

    expect(titulo).toContain('Mercadinho Exemplo');
  });
});

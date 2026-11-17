
import { Component, computed, signal } from '@angular/core';

interface Produto {
  nome: string;
  preco: number;
  quantidade: number;
  estoqueMinimo: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  tela = signal('menu');
  produtos = signal<Produto[]>(this.carregarProdutos());
  mensagem = signal('');

  indiceEdicao = signal<number | null>(null);

  // PRODUTOS QUE PRECISAM DE REPOSIÇÃO

  produtosParaReposicao = computed(() =>
    this.produtos().filter(
      produto => produto.quantidade <= produto.estoqueMinimo
    )
  );

  // INDICADORES DO DASHBOARD

  totalProdutos = computed(() =>
    this.produtos().length
  );

  totalEstoqueBaixo = computed(() =>
    this.produtosParaReposicao().length
  );

  totalUnidades = computed(() =>
    this.produtos().reduce(
      (total, produto) => total + produto.quantidade,
      0
    )
  );

  // CARREGAR PRODUTOS SALVOS

  carregarProdutos(): Produto[] {
    try {
      const dados = localStorage.getItem('produtosMercadinho');

      if (dados) {
        const produtos = JSON.parse(dados);
        return Array.isArray(produtos) ? produtos : [];
      }

      return [];
    } catch {
      return [];
    }
  }

  // SALVAR PRODUTOS NO NAVEGADOR

  guardarProdutos() {
    localStorage.setItem(
      'produtosMercadinho',
      JSON.stringify(this.produtos())
    );
  }

  // NAVEGAÇÃO

  abrirCadastro() {
    this.mensagem.set('');
    this.tela.set('cadastro');
  }

  voltarMenu() {
    this.mensagem.set('');
    this.tela.set('menu');
  }

  abrirConsulta() {
    this.mensagem.set('');
    this.tela.set('consulta');
  }

  abrirMovimentacao() {
    this.mensagem.set('');
    this.tela.set('movimentacao');
  }

  abrirRelatorio() {
    this.mensagem.set('');
    this.tela.set('relatorio');
  }

  // CADASTRAR PRODUTO

  salvarProduto(
    nome: string,
    preco: string,
    quantidade: string,
    estoqueMinimo: string
  ) {
    const valor = Number(preco);
    const qtd = Number(quantidade);
    const minimo = Number(estoqueMinimo);

    if (
      !nome.trim() ||
      !preco.trim() ||
      !quantidade.trim() ||
      !estoqueMinimo.trim() ||
      !Number.isFinite(valor) ||
      valor < 0 ||
      !Number.isInteger(qtd) ||
      qtd < 0 ||
      !Number.isInteger(minimo) ||
      minimo < 0
    ) {
      this.mensagem.set('Preencha os campos com valores válidos.');
      return;
    }

    const nomeExiste = this.produtos().some(
      produto =>
        produto.nome.toLowerCase() === nome.trim().toLowerCase()
    );

    if (nomeExiste) {
      this.mensagem.set(
        'Este produto já está cadastrado no estoque!'
      );
      return;
    }

    const produto: Produto = {
      nome: nome.trim(),
      preco: valor,
      quantidade: qtd,
      estoqueMinimo: minimo
    };

    this.produtos.update(lista => [...lista, produto]);

    this.guardarProdutos();

    this.mensagem.set('Produto cadastrado com sucesso!');
  }

  // ABRIR EDIÇÃO

  abrirEdicao(indice: number) {
    if (!this.produtos()[indice]) {
      return;
    }

    this.indiceEdicao.set(indice);
    this.mensagem.set('');
    this.tela.set('edicao');
  }

  // EDITAR PRODUTO

  editarProduto(
    nome: string,
    preco: string,
    estoqueMinimo: string
  ) {
    const indice = this.indiceEdicao();

    if (indice === null || !this.produtos()[indice]) {
      this.mensagem.set('Produto não encontrado.');
      return;
    }

    const valor = Number(preco);
    const minimo = Number(estoqueMinimo);

    if (
      !nome.trim() ||
      !preco.trim() ||
      !estoqueMinimo.trim() ||
      !Number.isFinite(valor) ||
      valor < 0 ||
      !Number.isInteger(minimo) ||
      minimo < 0
    ) {
      this.mensagem.set('Preencha os campos com valores válidos.');
      return;
    }

    const nomeExiste = this.produtos().some(
      (produto, i) =>
        i !== indice &&
        produto.nome.toLowerCase() === nome.trim().toLowerCase()
    );

    if (nomeExiste) {
      this.mensagem.set(
        'Já existe outro produto cadastrado com esse nome!'
      );
      return;
    }

    this.produtos.update(lista =>
      lista.map((produto, i) =>
        i === indice
          ? {
              ...produto,
              nome: nome.trim(),
              preco: valor,
              estoqueMinimo: minimo
            }
          : produto
      )
    );

    this.guardarProdutos();
    this.indiceEdicao.set(null);
    this.tela.set('consulta');
    this.mensagem.set('Produto atualizado com sucesso!');
  }

  // ENTRADA E SAÍDA DE MERCADORIAS

  movimentarProduto(
    indice: number,
    tipo: string,
    quantidade: string
  ) {
    const qtd = Number(quantidade);
    const produto = this.produtos()[indice];

    if (
      !produto ||
      !quantidade.trim() ||
      !Number.isInteger(qtd) ||
      qtd <= 0
    ) {
      this.mensagem.set('Informe uma quantidade válida.');
      return;
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
      this.mensagem.set('Tipo de movimentação inválido.');
      return;
    }

    if (tipo === 'saida' && qtd > produto.quantidade) {
      this.mensagem.set('Quantidade insuficiente no estoque.');
      return;
    }

    this.produtos.update(lista =>
      lista.map((item, i) =>
        i === indice
          ? {
              ...item,
              quantidade: tipo === 'entrada'
                ? item.quantidade + qtd
                : item.quantidade - qtd
            }
          : item
      )
    );

    this.guardarProdutos();

    this.mensagem.set('Estoque atualizado com sucesso!');
  }

  // EXCLUIR PRODUTO

  excluirProduto(indice: number) {
    const produto = this.produtos()[indice];

    if (!produto) {
      return;
    }

    const confirmar = confirm(
      `Deseja realmente excluir o produto "${produto.nome}"?`
    );

    if (!confirmar) {
      return;
    }

    this.produtos.update(lista =>
      lista.filter((_, i) => i !== indice)
    );

    this.guardarProdutos();

    this.mensagem.set('Produto excluído com sucesso!');
  }
}

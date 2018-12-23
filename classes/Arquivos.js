const { promisify } = require('util');
const { readFile } = require('fs');
const Loja = require('./Loja');
const Pedido = require('./Pedido');
const Card = require('./Card');

const readFileAsync = promisify(readFile);

class Arquivos {
	static async carregarLojas(path) {
		const conteudo = await this.lerArquivo(path);

		const linhas = conteudo.split('\n');

		const [, ...nomes] = linhas[0].split('\t');
		const [, ...fretes] = linhas[1].split('\t');

		const lojas = nomes.map((el, i) => new Loja(nomes[i], fretes[i]));

		return lojas;
	}

	static async carregarPedido(path) {
		const conteudo = await this.lerArquivo(path);
		const linhas = conteudo.split('\n');

		const vetCodigo = [],
			vetNumComprar = [];

		linhas.forEach(el => {
			const dados = el.split('\t');
			vetCodigo.push(dados[0]);
			vetNumComprar.push(parseInt(dados[1]));
		});

		return new Pedido(vetCodigo, vetNumComprar);
	}

	static async carregarCards(pathPrecos, pathQuantidades) {
		const conteudoPrecos = await this.lerArquivo(pathPrecos);
        const conteudoQuantidades = await this.lerArquivo(pathQuantidades);
        const listaCards = [];

		const [, ...vetPrecos] = conteudoPrecos.split('\n');
		const [, ...vetQuantidades] = conteudoQuantidades.split('\n');

		vetPrecos.forEach((el, i) => {
            const [nome, ...precos] = vetPrecos[i].split('\t');
            const [, ...estoques] = vetQuantidades[i].split('\t');

            const parsePrecos = precos.map(el => parseFloat(el));
            const parseEstoques = estoques.map(el => parseFloat(el));

            listaCards.push(new Card(nome, parsePrecos, parseEstoques));
        });
        
        return listaCards;
	}

	static async lerArquivo(path) {
		const conteudo = await readFileAsync(path, 'utf8');
		return conteudo.replace(/\r/gi, '');
	}
}

module.exports = Arquivos;

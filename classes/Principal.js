const config = require('../config');
const Arquivos = require('../classes/Arquivos');
const Populacao = require('../classes/Populacao');
const Selecao = require('../classes/Selecao');
const Cruzamento = require('../classes/Cruzamento');
const Mutacao = require('../classes/Mutacao');
const Insercao = require('../classes/Insercao');

class Principal {
	static async main() {
		const dados = await this.carregarDados();
		const populacao = await this.criarPopulacao(dados);
		this.fazerMutacao(populacao, dados[2], dados[0]);
	}

	static async carregarDados() {
		const promises = await Promise.all([
			Arquivos.carregarLojas(config.urlLojas),
			Arquivos.carregarPedido(config.urlPedido),
			Arquivos.carregarCards(config.urlPreco, config.urlQtd),
		]);

		return promises;
	}

	static criarPopulacao(listaDeDados) {
		const populacao = new Populacao(config.tamanhoPopulacao, listaDeDados);
		return populacao;
	}

	static fazerMutacao(populacao, vetCards, vetLojas) {
		let contador = 0;
		const numeroLojas = vetLojas.length;
		const chanceMutacao = parseInt(Math.random() * 100);

		const tempo = Date.now();

		do {
			let pais = Selecao.selecionarPais(populacao, 2);
			let filhos = Cruzamento.gerarFilhos(pais);
			let condMut = Mutacao.mutacaoClassica(filhos, chanceMutacao, 2, numeroLojas, vetCards);
			let condInsert = Insercao.inserirNaPopulacao(
				populacao,
				pais,
				filhos,
				vetCards,
				vetLojas,
				tempo,
			);
			contador++;
		} while (contador < config.ciclosDeMutacao);

		console.log(populacao.getTop1().getFitness());
	}
}

module.exports = Principal;

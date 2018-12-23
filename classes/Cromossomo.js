class Cromossomo {
	__init() {
		this.fitness = 0;
		this.valorTotalCards = 0;
		this.valorTotalFrete = 0;
		this.geracao = 0;
	}

	static construtorInteiro(numeroGenes) {
		const me = new this();
		me.__init();
		me.matGene = Array(2);
		me.matGene[0] = Array(numeroGenes);
		me.matGene[1] = Array(numeroGenes);
		return me;
	}

	static construtorNormal(vetCards, vetLojas, pedido) {
		const me = new this();
		me.__init();

		me.matGene = [];
		me.matGene[0] = Array(pedido.getNumCard());
		me.matGene[1] = Array(pedido.getNumCard());
		me.gerarGenes(vetCards, vetLojas, pedido);

		return me;
	}

	gerarGenes(vetCards, vetLojas, pedido) {
		const vetTempCards = [];
		let cont = 0;

		for (let i = 0; i < pedido.getVetCodigo().length; i++) {
			vetTempCards[i] = Cromossomo.clonar(vetCards[pedido.getPosVetCodigo(i)]);
			let j = 0;

			do {
				const posicaoAleatoria = parseInt(Math.random() * vetLojas.length);

				if (
					vetTempCards[i].getPosVetQtd(posicaoAleatoria) > 0 &&
					vetTempCards[i].getPosVetPreco(posicaoAleatoria) > 0
				) {
					this.matGene[0][cont] = posicaoAleatoria;
					this.matGene[1][cont] = pedido.getPosVetCodigo(i);
					vetTempCards[i].decVetQtd(posicaoAleatoria);
					cont++;
					j++;
				}
			} while (j < pedido.getPosVemNumComprar(i));
		}

		this.avaliar(vetCards, vetLojas);
	}

	avaliar(vetCard, vetLoja) {
		this.fitness = 0;
		this.valorTotalCards = 0;
		this.valorTotalFrete = 0;

		const vetCond = [];

		let loja;
		let card;

		for (let i = 0; i < this.matGene[0].length; i++) {
			loja = this.matGene[0][i];
			card = this.matGene[1][i];

			for (let j = 0; j < this.matGene[0].length; j++) {
				if (this.matGene[0][i] == this.matGene[0][j]) {
					if (!vetCond[i]) {
						this.fitness += vetLoja[loja].getFrete();
						this.valorTotalFrete += vetLoja[loja].getFrete();
					}

					vetCond[i] = 1;
					vetCond[j] = 1;
				}
			}

			if (!vetCond[i]) {
				this.fitness += vetLoja[loja].getFrete();
				this.valorTotalFrete += vetLoja[loja].getFrete();
			}

			this.fitness += vetCard[card].getPosVetPreco(loja);
			this.valorTotalCards += vetCard[card].getPosVetPreco(loja);
		}
	}

	static clonar(obj) {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}
		var temp = new obj.constructor();
		for (var key in obj) {
			temp[key] = this.clonar(obj[key]);
		}
		return temp;
	}

	setLabel(label) {
		this.label = label;
	}

	getLabel() {
		return this.label;
	}

	setPosicaoPopulacao(posicao) {
		this.posicaoPopulacao = posicao;
	}

	getFitness() {
		return this.fitness;
	}

	getNumeroGenes() {
		return this.matGene[0].length;
	}

	copiaGene(loja, card, posicao) {
		this.matGene[0][posicao] = loja;
		this.matGene[1][posicao] = card;
		return this;
	}

	getIdLoja(posicao) {
		return this.matGene[0][posicao];
	}

	getIdCard(posicao) {
		return this.matGene[1][posicao];
	}

	getPosicao() {
		return this.posicaoPopulacao;
	}

	setLoja(loja, posicao) {
		this.matGene[0][posicao] = loja;
		return this;
	}

	getGeracao() {
		return this.geracao;
	}

	setGeracao(geracao) {
		this.geracao = geracao;
	}

	heranca(pais, piorPai) {
		if (pais[0].getGeracao() > pais[1].getGeracao()) {
			this.geracao = pais[0].getGeracao() + 1;
		} else {
			this.geracao = pais[1].getGeracao() + 1;
		}
		this.posicaoPopulacao = piorPai.getPosicao();
		this.label = piorPai.getLabel();
	}
}

module.exports = Cromossomo;

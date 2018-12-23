class Card {
	constructor(nome, vetPreco, vetQuantidade) {
		this.nome = nome;
		this.vetPreco = vetPreco;
		this.vetQtd = vetQuantidade;
		return this;
	}

	decVetQtd(i) {
		this.vetQtd[i]--;
	}

	getPosVetQtd(i) {
		return this.vetQtd[i];
	}

	getPosVetPreco(i) {
		return this.vetPreco[i];
	}

	clone() {
		const nome = this.nome;
		const vetPreco = Array(this.vetPreco.length);
		const vetQtd = Array(this.vetQtd.length);

		for (let i = 0; i < this.vetPreco.length; i++) {
			vetPreco[i] = this.vetPreco[i];
			vetQtd[i] = this.vetQtd[i];
		}
		return new Card(nome, vetPreco, vetQtd);
	}
}

module.exports = Card;

class Pedido {
	constructor(vetCodigo, vetNumComprar) {
		this.vetCodigo = vetCodigo;
		this.vetNumComprar = vetNumComprar;
		this.NumCard = this.vetNumComprar.reduce((antigo, novo) => antigo + novo, 0);
		return this;
	}

	getNumCard() {
		return this.NumCard;
	}

	getVetCodigo() {
		return this.vetCodigo;
	}

	getPosVetCodigo(i) {
		return this.vetCodigo[i];
	}

	getPosVemNumComprar(i) {
		return this.vetNumComprar[i];
	}
}

module.exports = Pedido;

class Loja {
	constructor(nome, frete) {
		this.nome = nome;
		this.frete = parseFloat(frete);
		return this;
	}

	getNome() {
		return this.nome;
	}

	getFrete() {
		return this.frete;
	}
}

module.exports = Loja;

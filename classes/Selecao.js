class Selecao {
	static selecionarPais(populacao, numeroCromossomosSelecionar) {
		let pais = [];

		pais[0] = this.torneio(populacao, numeroCromossomosSelecionar);
		do {
			pais[1] = this.torneio(populacao, numeroCromossomosSelecionar);
		} while (pais[0].getFitness() == pais[1].getFitness());

		return pais;
	}

	static torneio(populacao, numeroCromossomosSelecionar) {
		let tamanhoPopulacao = populacao.getTamanhoPopulacao();
		let pos = parseInt(Math.random() * tamanhoPopulacao);
		let vencedor = populacao.getCromossomo(pos);

		for (let i = 0; i < numeroCromossomosSelecionar - 1; i++) {
			pos = parseInt(Math.random() * tamanhoPopulacao);

			if (vencedor.getFitness() > populacao.getCromossomo(pos).getFitness()) {
				vencedor = populacao.getCromossomo(pos);
			}
		}
		return vencedor;
	}
}

module.exports = Selecao;

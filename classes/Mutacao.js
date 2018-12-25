class Mutacao {
	static mutacaoClassica(filhos, chanceMutacao, numeroGenesMutar, numeroLojas, vetCard) {
		if (chanceMutacao > parseInt(Math.random() * 100)) {
			const numeroGenes = filhos[0].getNumeroGenes();

			for (let i = 0; i < filhos.length; i++) {
				for (let j = 0; j < numeroGenesMutar; j++) {
					let posicao = parseInt(Math.random() * numeroGenes);
					let card = filhos[i].getIdCard(posicao);

					let lojaAleatoria = null;

					do {
						lojaAleatoria = parseInt(Math.random() * numeroLojas);
					} while (
						vetCard[card].getPosVetPreco(lojaAleatoria) == 0 ||
						vetCard[card].getPosVetQtd(lojaAleatoria) == 0 ||
						lojaAleatoria == filhos[i].getIdLoja(posicao)
					);

					filhos[i].setLoja(lojaAleatoria, posicao);
				}
			}
			return true;
		}
		return false;
	}
}

module.exports = Mutacao;

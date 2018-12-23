class Mutacao {
	static fazerMutacao(filhos, porcentGene, chanceMut, variacao, vetCard) {
		return this.mutClassica(filhos, porcentGene, chanceMut, variacao, vetCard);
	}

	//Mutacao.S(filhos, 1, 1, 86, vetCards);
	static mutClassica(filhos, porcentGene, chanceMut, variacao, vetCard) {
		if (chanceMut > parseInt(Math.random() * 100)) {
			let numGenes = filhos[0].getNumeroGenes() * porcentGene / 100;

			if (numGenes == 0) {
				numGenes = 1;
			}

			let vetPos = [];

			for (let i = 0; i < filhos[0].getNumeroGenes(); i++) {
				vetPos[i] = i;
			}

			let aux, p1, p2;

			for (let i = 0; i < filhos[0].getNumeroGenes(); i++) {
				p1 = parseInt(Math.random() * vetPos.length);
				p2 = parseInt(Math.random() * vetPos.length);
				aux = vetPos[p1];
				vetPos[p1] = vetPos[p2];
				vetPos[p2] = aux;
			}

			for (let i = 0; i < numGenes; i++) {
				let novoGene = parseInt(Math.random() * variacao);
				while (
					vetCard[i].getPosVetPreco(novoGene) <= 0 ||
					vetCard[i].getPosVetQtd(novoGene) <= 0
				) {
					novoGene = parseInt(Math.random() * variacao);
				}
				filhos[0].setLoja(novoGene, vetPos[i]);
				try {
					filhos[1].setLoja(novoGene, vetPos[i]);
				} catch (e) {}
			}
			
			return true;
		}
		return true;
	}
}

module.exports = Mutacao;

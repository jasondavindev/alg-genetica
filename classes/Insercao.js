class Insercao {
	static inserirNaPopulacao(populacao, pais, filhos, vetCard, vetLoja, tempo) {
		return this.piorPaiMask(populacao, pais, filhos, vetCard, vetLoja, tempo);
	}

	static piorPaiMask(populacao, pais, filhos, vetCard, vetLoja, tempo) {
		filhos[0].avaliar(vetCard, vetLoja);
		filhos[1].avaliar(vetCard, vetLoja);

		let melhorFilho;
		let cond = false;

		if (filhos[0].getFitness() < filhos[1].getFitness()) {
			melhorFilho = filhos[0];
		} else {
			melhorFilho = filhos[1];
		}

		let piorPai;

		if (pais[0].getFitness() > pais[1].getFitness()) {
			piorPai = pais[0];
		} else {
			piorPai = pais[1];
		}

		if (melhorFilho.getFitness() < piorPai.getFitness()) {
			if (!this.detectaClone(populacao, melhorFilho)) {
				melhorFilho.heranca(pais, piorPai);
				populacao.setNovoCromossomo(piorPai.getPosicao(), melhorFilho);
				console.log(`Novo TOP1 Gerado em ${(Date.now() - tempo) / 1000}`);
				cond = true;
			}
		}

		if (populacao.getTop1().getFitness() > melhorFilho.getFitness()) {
			populacao.setTop1(melhorFilho);
		}

		return cond;
	}

	static detectaClone(populacao, filho) {
		for (let i = 0; i < populacao.getTamanhoPopulacao(); i++) {
			if (populacao.getCromossomo(i).getFitness() == filho.getFitness()) return true;
		}

		return false;
	}
}

module.exports = Insercao;

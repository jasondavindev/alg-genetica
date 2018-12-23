const Cromossomo = require('./Cromossomo');

class Populacao {
	constructor(tamanhoPopulacao, dados) {
		const [lojas, pedido, cards] = dados;

		this.vetCromossomos = [];

		let label = '';
		let primeiro = true;

		for (let i = 0; i < tamanhoPopulacao; i++) {
			// criando populacao

			if (i < 10) label = `00${i + 1}`;
			else if (i < 100) label = `0${i + 1}`;
			else label = i + 1;

			this.vetCromossomos[i] = Cromossomo.construtorNormal(cards, lojas, pedido);
			this.vetCromossomos[i].setLabel(label);
            this.vetCromossomos[i].setPosicaoPopulacao(i);

			if (primeiro) {
                this.top1 = this.vetCromossomos[i];
                primeiro = false;
			} else if (this.top1.getFitness() > this.vetCromossomos[i].getFitness()) {
				this.top1 = this.vetCromossomos[i];
            }
		}
    }
    
    getCromossomo(indice) {
        return this.vetCromossomos[indice];
    }

    getTamanhoPopulacao() {
        return this.vetCromossomos.length;
    }

    getTop1() {
        return this.top1;
    }

    setTop1(cromossomo) {
        this.top1 = cromossomo;
    }

    setNovoCromossomo(posicao, novoCromossomo) {
        this.vetCromossomos[posicao] = novoCromossomo;
    }
}

module.exports = Populacao;

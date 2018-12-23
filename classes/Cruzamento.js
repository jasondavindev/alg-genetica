const Cromossomo = require('./Cromossomo');

class Cruzamento {
	static gerarFilhos(pais) {
		return this.mascara(pais);
	}

	static mascara(pais) {
		let filhos = [];
		filhos[0] = Cromossomo.construtorInteiro(pais[0].getNumeroGenes());
		filhos[1] = Cromossomo.construtorInteiro(pais[0].getNumeroGenes());
        
        let mask;
        
		for (let i = 0; i < pais[0].getNumeroGenes(); i++) {
            mask = parseInt(Math.random() * 2);
            
			if (mask == 0) {
				filhos[0].copiaGene(pais[0].getIdLoja(i), pais[0].getIdCard(i), i);
				filhos[1].copiaGene(pais[1].getIdLoja(i), pais[1].getIdCard(i), i);
			} else {
				filhos[0].copiaGene(pais[1].getIdLoja(i), pais[1].getIdCard(i), i);
				filhos[1].copiaGene(pais[0].getIdLoja(i), pais[0].getIdCard(i), i);
			}
        }
        
		return filhos;
	}
}

module.exports = Cruzamento;

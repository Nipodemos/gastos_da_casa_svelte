class Divisao {
	pessoas: IPessoa[] = $state([]);
	despesas: IDespesa[] = $state([]);

	valorPorPessoa(pessoa: IPessoa) {
		const valorTotalDespesas = this.despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
		const valorTotalReceitas = this.pessoas.reduce((acc, pessoa) => {
			const salarioLiquido = this.salarioLiquido(pessoa);
			return acc + salarioLiquido;
		}, 0);

		const salarioLiquido = this.salarioLiquido(pessoa);

		const porcentagemDaPessoa = Math.round((salarioLiquido / valorTotalReceitas) * 100);

		return Math.round((valorTotalDespesas / 100) * porcentagemDaPessoa);
	}

	salarioLiquido(pessoa: IPessoa) {
		let valorInss = 0;
		if (pessoa.porcentagemTaxaInss != 0)
			valorInss = (pessoa.salario / 100) * pessoa.porcentagemTaxaInss;
		let valorTaxaAlimentacao = 0;
		if (pessoa.porcentagemTaxaAlimentacao != 0)
			valorTaxaAlimentacao = (pessoa.salario / 100) * pessoa.porcentagemTaxaAlimentacao;
		const salarioLiquido =
			pessoa.salario - valorInss - valorTaxaAlimentacao + pessoa.valorAlimentacao;
		return salarioLiquido;
	}
	constructor(
		public id: number,
		public nome: string,
		public sigla: string
	) {}
}

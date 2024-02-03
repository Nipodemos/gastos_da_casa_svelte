export class DivisaoStore {
	public valorPorPessoa(pessoa: IPessoa) {
		const valorTotalDespesas = this.valorTotalDespesas();
		const valorTotalReceitas = this.valorTotalReceitas();
		const salarioLiquido = this.salarioLiquido(pessoa);

		const porcentagemDaPessoa = Math.round((salarioLiquido / valorTotalReceitas) * 100);

		return Math.round((valorTotalDespesas / 100) * porcentagemDaPessoa);
	}

	public sobraPorPessoa(pessoa: IPessoa) {
		const valorPorPessoa = this.valorPorPessoa(pessoa);
		const salarioLiquido = this.salarioLiquido(pessoa);
		return salarioLiquido - valorPorPessoa;
	}

	public salarioLiquido(pessoa: IPessoa) {
		const valorInss = this.valorInssPorPessoa(pessoa);
		const valorTaxaAlimentacao = this.valorTaxaAlimentacaoPorPessoa(pessoa);
		const valorTaxaPassagem = this.valorTaxaPassagemPorPessoa(pessoa);
		const salarioLiquido =
			pessoa.salario -
			valorInss -
			valorTaxaAlimentacao -
			valorTaxaPassagem +
			pessoa.valorAlimentacao;
		return salarioLiquido;
	}

	public valorTotalDespesas() {
		return this.despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
	}

	public valorTotalReceitas() {
		return this.pessoas.reduce((acc, pessoa) => {
			const salarioLiquido = this.salarioLiquido(pessoa);
			return acc + salarioLiquido;
		}, 0);
	}

	public valorInssPorPessoa(pessoa: IPessoa) {
		if (pessoa.porcentagemTaxaInss == 0) return 0;
		return (pessoa.salario / 100) * pessoa.porcentagemTaxaInss;
	}

	public valorTaxaAlimentacaoPorPessoa(pessoa: IPessoa) {
		if (pessoa.porcentagemTaxaAlimentacao == 0) return 0;
		return (pessoa.salario / 100) * pessoa.porcentagemTaxaAlimentacao;
	}

	public valorTaxaPassagemPorPessoa(pessoa: IPessoa) {
		if (pessoa.porcentagemTaxaPassagem == 0) return 0;
		return (pessoa.salario / 100) * pessoa.porcentagemTaxaPassagem;
	}
	constructor(
		public pessoas: IPessoa[],
		public despesas: IDespesa[]
	) {}
}

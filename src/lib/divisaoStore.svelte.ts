import { getContext, setContext } from 'svelte';
import jsonMergePatch from 'json-merge-patch';

export class DivisaoStore {
	public pessoas = $state<IPessoa[]>();
	public despesas = $state<IDespesa[]>();

	public initialPessoas: IPessoa[];
	public initialDespesas: IDespesa[];
	constructor(pessoas: IPessoa[], despesas: IDespesa[]) {
		this.pessoas = pessoas;
		this.despesas = despesas;
		this.initialPessoas = pessoas;
		this.initialDespesas = despesas;
	}
	public getValorPorPessoa(pessoa: IPessoa) {
		const valorTotalDespesas = this.getValorTotalDespesas();
		const valorTotalReceitas = this.getValorTotalReceitas();
		const salarioLiquido = this.getSalarioLiquido(pessoa);

		const porcentagemDaPessoa = Math.round((salarioLiquido / valorTotalReceitas) * 100);

		return Math.round((valorTotalDespesas / 100) * porcentagemDaPessoa);
	}

	public getSobraPorPessoa(pessoa: IPessoa) {
		const valorPorPessoa = this.getValorPorPessoa(pessoa);
		const salarioLiquido = this.getSalarioLiquido(pessoa);
		return salarioLiquido - valorPorPessoa;
	}

	public getSalarioLiquido(pessoa: IPessoa) {
		const valorInss = this.getValorInssPorPessoa(pessoa);
		const valorTaxaAlimentacao = this.getValorTaxaAlimentacaoPorPessoa(pessoa);
		const valorTaxaPassagem = this.getValorTaxaPassagemPorPessoa(pessoa);
		const salarioLiquido =
			pessoa.salario -
			valorInss -
			valorTaxaAlimentacao -
			valorTaxaPassagem +
			pessoa.valorAlimentacao;
		return salarioLiquido;
	}

	public getValorTotalDespesas() {
		if (!this.despesas) return 0;
		return this.despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
	}

	public getValorTotalReceitas() {
		if (!this.pessoas) return 0;
		return this.pessoas.reduce((acc, pessoa) => {
			const salarioLiquido = this.getSalarioLiquido(pessoa);
			return acc + salarioLiquido;
		}, 0);
	}

	public getValorInssPorPessoa(pessoa: IPessoa) {
		if (pessoa.porcentagemTaxaInss == 0) return 0;
		return (pessoa.salario / 100) * pessoa.porcentagemTaxaInss;
	}

	public getValorTaxaAlimentacaoPorPessoa(pessoa: IPessoa) {
		if (pessoa.porcentagemTaxaAlimentacao == 0) return 0;
		return (pessoa.salario / 100) * pessoa.porcentagemTaxaAlimentacao;
	}

	public getValorTaxaPassagemPorPessoa(pessoa: IPessoa) {
		if (pessoa.porcentagemTaxaPassagem == 0) return 0;
		return (pessoa.salario / 100) * pessoa.porcentagemTaxaPassagem;
	}

	public adicionarNovaDespesa(despesa: IDespesa) {
		if (!this.despesas) return;
		this.despesas.push(despesa);
	}

	public alterarDespesa(despesa: IDespesa) {
		if (!this.despesas) return false;
		const index = this.despesas.findIndex((d) => d.id === despesa.id);
		if (index === -1) return false;
		this.despesas[index] = despesa;
		const initalJsonBin = {
			despesas: this.initialDespesas,
			pessoas: this.initialPessoas
		};
		const currentJsonBin = {
			despesas: this.despesas,
			pessoas: this.pessoas
		};
		const patch = jsonMergePatch.generate(initalJsonBin, currentJsonBin);
		console.log(patch);

		return true;
	}
}

const DIVISAO_CTX = 'divisao';

export function createDivisaoStore(pessoas: IPessoa[], despesas: IDespesa[]) {
	const divisaoStore = new DivisaoStore(pessoas, despesas);
	setContext(DIVISAO_CTX, divisaoStore);
	return divisaoStore;
}

export function getDivisaoStore() {
	return getContext<DivisaoStore>(DIVISAO_CTX);
}

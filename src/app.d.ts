// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface IPessoa {
		id: number;
		nome: string;
		salario: number;
		valorAlimentacao: number;
		porcentagemTaxaInss: number;
		porcentagemTaxaAlimentacao: number;
	}

	interface IDespesa {
		id: number;
		valor: number;
		descricao: string;
	}

	export type jsonBinType = {
		pessoas: Array<IPessoa>;
		despesas: Array<IDespesa>;
	};
}

export {};

<script lang="ts">
	import { getDivisaoStore, type DivisaoStore } from '$lib/divisaoStore.svelte';
	//	import bootstrap from 'bootstrap';

	const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
	//	const modal = new bootstrap.Modal('#exampleModal');
	const divisaoStore = getDivisaoStore();
	const despesas = divisaoStore.despesas;

	let novaDespesa: IDespesa = $state({
		id: Math.floor(Math.random() * 100000) + 1,
		valor: 0,
		descricao: ''
	});

	let loading = $state(false);

	const limparCampos = () => {
		novaDespesa = {
			id: Math.floor(Math.random() * 100000) + 1,
			valor: 0,
			descricao: ''
		};
	};

	let titulo = $state('Adicionar nova despesa');

	async function adicionarDespesa() {
		loading = true;
		limparCampos();
		//modal.hide();
	}
</script>

<h1 class="mb-5">Despesas</h1>

<!-- Button trigger modal -->
<button
	type="button"
	class="mb-1 btn btn-primary"
	data-bs-toggle="modal"
	data-bs-target="#exampleModal"
	onclick={limparCampos}
>
	Adicionar Nova Despesa
</button>

<table class="table table-striped table-bordered">
	<thead>
		<tr>
			<th>Valor</th>
			<th>Descrição</th>
			<th>Ações</th>
		</tr>
	</thead>
	<tbody>
		{#if !despesas}
			<tr>
				<td colSpan="3">Nenhuma despesa cadastrada</td>
			</tr>
		{:else}
			{#each despesas as despesa}
				<tr>
					<td>{formatter.format(despesa.valor)}</td>
					<td>{despesa.descricao}</td>
					<td>
						<a href={'/alterar_despesa?id=' + despesa.id} class="mb-1 btn btn-primary">Editar</a>
						<button class="mb-1 btn btn-danger">Excluir</button>
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

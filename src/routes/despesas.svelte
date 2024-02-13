<script lang="ts">
	import { getDivisaoStore, type DivisaoStore } from '$lib/divisaoStore.svelte';

	const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
	const divisaoStore = getDivisaoStore();
	const despesas = divisaoStore.despesas;
</script>

<h1 class="mb-5">Despesas</h1>

<!-- Button trigger modal -->
<a href="/alterar_despesa" class="mb-1 btn btn-primary"> Adicionar Nova Despesa </a>

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
						<a
							href={'/alterar_despesa?' +
								new URLSearchParams({
									id: despesa.id.toString(),
									descricao: despesa.descricao,
									valor: despesa.valor.toString()
								}).toString()}
							class="mb-1 btn btn-primary">Editar</a
						>
						<button class="mb-1 btn btn-danger">Excluir</button>
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

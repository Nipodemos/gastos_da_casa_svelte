<script lang="ts">
	interface Props {
		despesas: IDespesa[];
	}
	let { despesas } = $props<Props>();
	const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
</script>

<h1 class="mb-5">Despesas</h1>
<table class="table table-striped table-bordered">
	<thead>
		<tr>
			<th>Valor</th>
			<th>Descrição</th>
			<th>Ações</th>
		</tr>
	</thead>
	<tbody>
		{#each despesas as despesa}
			<tr>
				<td>{formatter.format(despesa.valor)}</td>
				<td>{despesa.descricao}</td>
				<td>
					<button class="btn btn-primary">Editar</button>
					<button class="btn btn-danger">Excluir</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

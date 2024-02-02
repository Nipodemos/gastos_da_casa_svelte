<script lang="ts">
	interface Props {
		despesas: IDespesa[];
	}
	let { despesas } = $props<Props>();
	const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
</script>

<div>
	<table>
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
						<button>Editar</button>
						<button>Excluir</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

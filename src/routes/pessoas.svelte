<script lang="ts">
	import type { DivisaoStore } from '$lib/divisaoStore';

	interface Props {
		divisaoStore: DivisaoStore;
	}
	const { divisaoStore } = $props<Props>();
	const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
</script>

<h1 class="mb-5">Pessoas</h1>

{#each divisaoStore.pessoas as pessoa}
	<div class="card mb-3">
		<div class="card-header">
			<h5 class="card-title">{pessoa.nome}</h5>
		</div>
		<div class="card-body">
			<div class="list-group">
				<div class="list-group-item">Salário Bruto: {formatter.format(pessoa.salario)}</div>
				<div class="list-group-item">Alimentação: {formatter.format(pessoa.valorAlimentacao)}</div>
				<div class="list-group-item">
					INSS: {formatter.format(divisaoStore.valorInssPorPessoa(pessoa))} ({pessoa.porcentagemTaxaInss}%)
				</div>
				<div class="list-group-item">
					Passagem: {formatter.format(divisaoStore.valorTaxaPassagemPorPessoa(pessoa))} ({pessoa.porcentagemTaxaPassagem}%)
				</div>
				<div class="list-group-item">
					Salário líquido: {formatter.format(divisaoStore.salarioLiquido(pessoa))}
				</div>
			</div>
		</div>
	</div>
{/each}
```

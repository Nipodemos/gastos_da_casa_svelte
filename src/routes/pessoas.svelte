<script lang="ts">
	import { getDivisaoStore, type DivisaoStore } from '$lib/divisaoStore.svelte';

	const divisaoStore = getDivisaoStore();
	const pessoas = divisaoStore.pessoas;
	const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
</script>

<h1 class="mb-5">Pessoas</h1>

{#if !pessoas}
	<p>Nenhuma pessoa cadastrada</p>
{:else}
	{#each pessoas as pessoa}
		<div class="card mb-3">
			<div class="card-header">
				<h5 class="card-title">{pessoa.nome}</h5>
			</div>
			<div class="card-body">
				<div class="list-group">
					<div class="list-group-item">Salário Bruto: {formatter.format(pessoa.salario)}</div>
					<div class="list-group-item">
						Alimentação: {formatter.format(pessoa.valorAlimentacao)}
					</div>
					<div class="list-group-item">
						INSS: {formatter.format(divisaoStore.getValorInssPorPessoa(pessoa))} ({pessoa.porcentagemTaxaInss}%)
					</div>
					<div class="list-group-item">
						Passagem: {formatter.format(divisaoStore.getValorTaxaPassagemPorPessoa(pessoa))} ({pessoa.porcentagemTaxaPassagem}%)
					</div>
					<div class="list-group-item">
						Salário líquido: {formatter.format(divisaoStore.getSalarioLiquido(pessoa))}
					</div>
				</div>
			</div>
		</div>
	{/each}
{/if}

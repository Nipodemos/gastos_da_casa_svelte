<script lang="ts">
	import { getDivisaoStore, type DivisaoStore } from '$lib/divisaoStore.svelte';
	const divisaoStore = getDivisaoStore();
	let pessoas = divisaoStore.pessoas;
	const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
</script>

<h1 class="mb-5">Divisão</h1>

{#if !pessoas}
	<p>Nenhuma pessoa cadastrada</p>
{:else}
	{#each pessoas as pessoa}
		<div class="card mb-3">
			<div class="card-header">
				<h5 class="card-title">{pessoa.nome}</h5>
			</div>
			<div class="card-body">
				Valor: {formatter.format(divisaoStore.getValorPorPessoa(pessoa))}
			</div>
		</div>
	{/each}
{/if}

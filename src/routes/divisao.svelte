<script lang="ts">
	import type { DivisaoStore } from '$lib/divisaoStore';

	interface Props {
		divisaoStore: DivisaoStore;
	}
	let { divisaoStore } = $props<Props>();
	let pessoas = divisaoStore.pessoas;
	let despesas = divisaoStore.despesas;
	const formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
</script>

<h1 class="mb-5">Divisão</h1>

{#each pessoas as pessoa}
	<div class="card mb-3">
		<div class="card-header">
			<h5 class="card-title">{pessoa.nome}</h5>
		</div>
		<div class="card-body">
			Valor: {formatter.format(divisaoStore.valorPorPessoa(pessoa))}
		</div>
	</div>
{/each}

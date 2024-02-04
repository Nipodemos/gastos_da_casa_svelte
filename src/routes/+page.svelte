<script lang="ts">
	import { DivisaoStore } from '$lib/divisaoStore';
	import Despesas from './despesas.svelte';
	import Divisao from './divisao.svelte';
	import Pessoas from './pessoas.svelte';

	let { data } = $props();
	$inspect(data.pessoas);
	let divisaoStore = new DivisaoStore(data.pessoas, data.despesas);
</script>

<div class="container">
	<div class="despesas"><Despesas {divisaoStore} /></div>
	<div class="divisao"><Divisao {divisaoStore} /></div>
	<div class="pessoas"><Pessoas {divisaoStore} /></div>
</div>

<style>
	.container {
		display: flex;
		max-width: 100vw;
	}

	.despesas {
		flex: 2;
		padding: 20px;
		border: 1px solid red;
	}

	.divisao {
		flex: 1;
		padding: 20px;
		border: 1px solid red;
	}
	.pessoas {
		flex: 1;
		padding: 20px;
		border: 1px solid red;
	}
</style>

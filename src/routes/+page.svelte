<script lang="ts">
	import Despesas from './despesas.svelte';
	import Divisao from './divisao.svelte';
	import Pessoas from './pessoas.svelte';

	let { data } = $props();
	$inspect(data);
</script>

<div class="container">
	<div class="despesas">
		<Despesas despesas={data.despesas} />
	</div>
	<div class="divisao"><Divisao /></div>
	<div class="pessoas"><Pessoas /></div>
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

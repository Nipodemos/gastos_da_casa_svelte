<script lang="ts">
	import { page } from '$app/stores';
	import { getDivisaoStore } from '$lib/divisaoStore.svelte';
	let title = 'Alterar Despesa';
	const url = $page.url;

	console.log(url);
	let idParam = url.searchParams.get('id');
	if (!idParam) {
		title = 'Adicionar Despesa';
		idParam = '0';
	}
	let id = parseInt(idParam);
	let descricao = '';
	let valor = 0;
	const divisaoStore = getDivisaoStore();
	let despesa = divisaoStore.despesas!.find((d) => d.id === id);
	if (despesa) {
		descricao = despesa.descricao;
		valor = despesa.valor;
	}
</script>

<h1 class="text-center">{title}</h1>

<div class="mb-3 d-flex justify-content-center">
	<input type="hidden" name="id" bind:value={id} />

	<label for="descricao">Descrição:</label>
	<input type="text" id="descricao" bind:value={descricao} class="form-control" />
</div>

<div class="mb-3 d-flex justify-content-center">
	<label for="valor">Valor:</label>
	<input type="number" id="valor" bind:value={valor} class="form-control" />
</div>

<div class="d-flex justify-content-center">
	<button class="btn btn-primary">Salvar</button>
</div>

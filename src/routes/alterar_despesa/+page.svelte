<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	const { data } = $props();

	const { form, errors, constraints, enhance } = superForm(data.form);

	const url = $page.url;
	let idParam = url.searchParams.get('id');
	let title = $state(idParam ? 'Alterar Despesa' : 'Adicionar Despesa');
</script>

<h1 class="text-center">{title}</h1>
<SuperDebug data={$form} />
<form
	action=""
	method="POST"
	class="container d-flex flex-column justify-content-center align-items-center"
	use:enhance
>
	<div class="mb-3">
		<input type="hidden" name="id" bind:value={$form.id} />

		<label for="descricao">Descrição:</label>
		<input
			type="text"
			id="descricao"
			name="descricao"
			bind:value={$form.descricao}
			{...$constraints.descricao}
			class="form-control"
		/>
		<div class="invalid-feedback">{$errors?.descricao}</div>
	</div>

	<div class="mb-3">
		<label for="valor">Valor:</label>
		<input
			type="number"
			id="valor"
			name="valor"
			bind:value={$form.valor}
			{...$constraints.valor}
			class="form-control"
		/>
		<div class="invalid-feedback">{$errors?.valor}</div>
	</div>

	<div class="">
		<button class="btn btn-primary">Salvar</button>
	</div>
</form>

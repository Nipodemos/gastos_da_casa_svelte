<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	export let data;

	const { form, errors, constraints, enhance } = superForm(data.form);

	//let title = idParam ? 'Alterar Despesa' : 'Adicionar Despesa';
</script>

<h1 class="text-center">Adiciona Despesa</h1>
<SuperDebug data={$form} />
<form
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
		{#if $errors?.descricao}
			<div class="invalid-feedback">{$errors?.descricao}</div>
		{/if}
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
		{#if $errors?.valor}
			<div class="invalid-feedback">{$errors?.valor}</div>
		{/if}
	</div>

	<div class="">
		<button class="btn btn-primary">Salvar</button>
	</div>
</form>

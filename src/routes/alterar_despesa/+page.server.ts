import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getDivisaoStore } from '$lib/divisaoStore.svelte';

const schema = z.object({
	id: z.number(),
	descricao: z.string().min(2, 'Mínimo de 2 caracteres').max(100, 'Máximo de 100 caracteres '),
	valor: z.number().min(0.01, 'Valor não pode ser zero').nonnegative('Valor não pode ser negativo')
});

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'));
	const descricao = url.searchParams.get('descricao');
	const valor = Number(url.searchParams.get('valor'));
	if (id && descricao && valor) {
		const form = await superValidate({ id, descricao, valor }, zod(schema));
		return { form };
	}
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const novaDespesa: IDespesa = {
			id: form.data.id,
			descricao: form.data.descricao,
			valor: form.data.valor
		};

		const divisaoStore = getDivisaoStore();
		const result = divisaoStore.alterarDespesa(novaDespesa);

		if (!result) {
			return fail(500, { form });
		}

		return { form };
	}
};

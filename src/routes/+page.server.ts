import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import type { Actions } from '@sveltejs/kit';
export const load: PageServerLoad = async () => {
	console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
	const apiPassword = env.API_PASSWORD;
	const apiBinKey = env.API_BIN_KEY;
	if (!apiPassword || !apiBinKey) {
		throw new Error('API_PASSWORD ou API_BIN_KEY não definidos');
	}
	// site pra eu acessar o bin: https://extendsclass.com/json-storage.html
	const res = await fetch('https://json.extendsclass.com/bin/' + apiBinKey, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Security-key': apiPassword
		}
	});
	const jsonBin: jsonBinType = await res.json();

	return jsonBin;
};
export const actions = {
	despesa: async (event) => {
		// TODO log the user in
	}
} satisfies Actions;

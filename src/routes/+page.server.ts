import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
export const load: PageServerLoad = async () => {
	console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
	const apiPassword = env.API_PASSWORD;
	const apiBinKey = env.API_BIN_KEY;
	if (!apiPassword || !apiBinKey) {
		throw new Error('API_PASSWORD ou API_BIN_KEY não definidos');
	}
	const res = await fetch('https://json.extendsclass.com/bin/' + apiBinKey, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Security-key': apiPassword
		}
	});
	const jsonBin: jsonBinType = await res.json();
	console.log('jsonBin :>> ', jsonBin);
	return jsonBin;
};

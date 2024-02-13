import { env } from '$env/dynamic/private';
export class JsonDatabase {
	public async getAll() {
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
	}

	public async save(pessoas: IPessoa[], despesas: IDespesa[]) {
		const apiPassword = env.API_PASSWORD;
		const apiBinKey = env.API_BIN_KEY;
		if (!apiPassword || !apiBinKey) {
			throw new Error('API_PASSWORD ou API_BIN_KEY não definidos');
		}
		const jsonBin = {
			pessoas,
			despesas
		};
		const res = await fetch('https://json.extendsclass.com/bin/' + apiBinKey, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/merge-patch+json',
				'Security-key': apiPassword
			},
			body: JSON.stringify(jsonBin)
		});
		const result = await res.json();
		return result;
	}
}

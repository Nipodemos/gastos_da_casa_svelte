import { JsonDatabase } from '$lib/database';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async () => {
	const database = new JsonDatabase();
	const jsonBin = await database.getAll();
	return jsonBin;
};

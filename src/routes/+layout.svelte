<script lang="ts">
	import { createDivisaoStore } from '$lib/divisaoStore.svelte';

	interface Props {
		data: {
			pessoas: IPessoa[];
			despesas: IDespesa[];
		};
		children: any;
	}
	let { children, data } = $props<Props>();
	createDivisaoStore(data.pessoas, data.despesas);
</script>

{@render children()}

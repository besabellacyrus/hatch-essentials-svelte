<script> 
	import { onMount } from 'svelte';
	import { fadeIn, fadeOut } from '../components/pageFade.js';
	let show = true;

	onMount(() => {
		show = false;
	})

</script>

<style>
</style>

{#if show} 
	<div class="loader"> 
	</div>
	{:else}
	<div in:fadeIn out:fadeOut>
		<slot></slot>
	</div> 
{/if}

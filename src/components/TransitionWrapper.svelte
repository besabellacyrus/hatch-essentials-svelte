<script> 
	import { fadeIn, fadeOut } from '../components/pageFade.js';
</script>

<style>
</style>
 
<div in:fadeIn out:fadeOut>
	<slot></slot>
</div> 

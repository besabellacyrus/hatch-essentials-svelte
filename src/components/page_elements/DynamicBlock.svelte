<script>
  export let content;
  export let bgColor; 
</script>
<style>
	.he-row {
		max-width: 1900px;
		margin: 0 auto;
	}
</style>
<section class="he-row" style="background-color: {bgColor ? bgColor : ''}">
  {@html content}
</section>

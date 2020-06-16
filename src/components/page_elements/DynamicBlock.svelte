<script>
  export let content;
  export let bgColor; 
</script>
 
<section class="he-row" style="background-color: {bgColor ? bgColor : ''}">
  {@html content}
</section> 

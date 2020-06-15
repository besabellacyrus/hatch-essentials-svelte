<script>
  export let content;
  export let bgColor; 
  let blog = "\n<!--nextpage-->\n\n\n\n<figure class=\"wp-block-gallery columns-3 is-cropped\"><ul class=\"blocks-gallery-grid\"><li class=\"blocks-gallery-item\"><figure><img src=\"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/Hatch-Essentials-Instagram-Profile-Pic.jpg\" alt=\"\" data-id=\"39\" data-full-url=\"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/Hatch-Essentials-Instagram-Profile-Pic.jpg\" data-link=\"http://hatchessentials.com/wp-api/hatch-essentials-instagram-profile-pic/\" class=\"wp-image-39\"/></figure></li><li class=\"blocks-gallery-item\"><figure><img src=\"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/IMG_0557.jpg\" alt=\"\" data-id=\"38\" data-full-url=\"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/IMG_0557.jpg\" data-link=\"http://hatchessentials.com/wp-api/img_0557/\" class=\"wp-image-38\"/></figure></li><li class=\"blocks-gallery-item\"><figure><img src=\"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/Square_PSK_DesertMist.jpg\" alt=\"\" data-id=\"37\" data-full-url=\"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/Square_PSK_DesertMist.jpg\" data-link=\"http://hatchessentials.com/wp-api/square_psk_desertmist/\" class=\"wp-image-37\"/></figure></li></ul></figure>\n\n\n\n<p>Lorem ipsum dolor sit amet</p>\n\n\n\n<h2 class=\"has-text-align-center\">Hello My Friend</h2>\n\n\n\n<blockquote class=\"wp-block-quote\"><p>lorem ipsum quote</p></blockquote>\n\n\n\n<figure class=\"wp-block-image size-large\"><img src=\"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/Main-Image-Blog.jpg\" alt=\"\" class=\"wp-image-48\"/></figure>\n";
</script>
<style lang="scss">
	.he-row {
		max-width: 1900px;
		margin: 0 auto;
	}
</style>
<section class="he-row" style="background-color: {bgColor ? bgColor : ''}">
  {@html content}
</section>
<section class="blog-posts">
	<div class="blog-post">
		<img src="" alt="">
	</div>
</section>

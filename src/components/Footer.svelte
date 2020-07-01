<script>
  import HatchInstagram from "../components/page_elements/HatchInstagram.svelte";
  import Subscribe from "../components/page_elements/Subscribe.svelte";
</script>

<style lang="scss">
  .footer-links {
    width: 100%;
  }
</style>

<div class="spacer" />
<Subscribe />
<div class="container mx-auto footer-links-nav">
  <div class="footer-links text-center md:flex md:justify-between">
    <span>
      <a href="/essential-oils-101/#faq_section">FAQ</a>
    </span>
    <span>•</span>
    <span>
      <a
        href="https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member">
        Begin Now
      </a>
    </span>
    <span>•</span>
    <span>
      <a href="/contact">Contact</a>
    </span>
    <span>•</span>
    <span>
      <a href="/the-blog">Blog</a>
    </span>
    <span>•</span>
    <span>
      <a href="/privacy-policy">Privacy</a>
    </span>
  </div>
</div>
<footer>
  <div class="container mx-auto">
    <div>
      <hr />
    </div>
    <HatchInstagram />
  </div>
  <div class="container mx-auto text-center mt-2">
    <span style="font-size: 1.2rem; white-space:pre-wrap;">
      Copyright © 2020 Hatch Essentials
    </span>
  </div>
</footer>

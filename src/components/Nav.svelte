<script>
  export let segment;
</script>

<style lang="scss">
  nav {
    // border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
  .nav-mobile {
    height: 5rem;
    svg {
      height: 1.7rem;
    }
    @media screen and (min-width: 426px) {
      display: none;
    }
  }
  .nav-pc {
    height: 5rem;
    @media screen and (max-width: 425px) {
      display: none;
    }
  }
</style>

<nav class="main-nav">
  <div class="nav-mobile flex items-center justify-between">
    <div>Hatch Essenstials</div>
    <svg
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  </div>
  <div class="nav-pc flex items-center justify-between">
    <div>Hatch Essenstials</div>
    <div>
      <ul class="flex">
        <li class="mr-5">WELLNESS LIFESTYLE</li>
        <li class="mr-5">ABOUT</li>
        <li class="mr-5">THE BUSINESS</li>
      </ul>
    </div>
  </div>
</nav>
<!-- <nav>
  <ul class="nav-pc">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        about
      </a>
    </li>

    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'blog' ? 'page' : undefined}
        href="blog">
        blog
      </a>
    </li>
  </ul>
</nav> -->

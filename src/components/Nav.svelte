

<style lang="scss">
  nav {
    font-weight: 300;
  }

  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 0.1rem;
  }
 
  li {
     text-align: center;
     margin-top: 0.4rem;
     svg {
        margin: 0 auto;
        width: 5rem;
        height: 1rem;
        position: relative;
        top: 1.2rem;
     }  
  } 

  [aria-current] {
    .nav-item  {
      opacity: 1;
    }
  }  

  a {
    text-decoration: none; 
    display: block;
    transition: all 300ms;
    &:hover {
      color: rgba(0,0,0,0.7);
    }
  }
  nav {
    background-color: #fbf6f4;
    ul {
      font-size: 1.3rem;
      @media screen and (max-width: 768px) {
        font-size: 0.9rem;
      }
      font-weight: bold;
    }
  }
  .nav-mobile {
    height: 8rem;
    svg {
      height: 3rem;
    }
    @media screen and (min-width: 598px) {
      display: none;
    }
  }
  .nav-pc {
    height: 7rem;

    /*margin-top: 1rem;*/
    @media screen and (max-width: 599px) {
      display: none;
    }
  }
  .nav-item {
    opacity: 0.6; 
    transition: 300ms all; 
    height: 3rem;
    position: relative; 
    top: -0.18rem;
    &:active {
      opacity: 1;
    }
    &:hover {
      opacity: 1;
    }
  }
  .nav-item-1 { 
    color: #ac335e;
  }
  .nav-item-2 {
    color: #c16995;
  }
  .nav-item-3 {
    color: #e4a73A;
  }
  .nav-item-4 {
    color: #3e99c4;
  }
  .nav-item-5 {
    color: #543c78;
  }
  .nav-item-6 {
    color: #267d75;
  }
  .main-nav {
    max-width: 1900px;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
    @media screen and (max-width: 425px) {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
  .hatch-nav {
    margin-top: 2.34rem;
  }
  img.logo {
    @media screen and (max-width: 768px) {
      height: 4.5rem;
    }
  }

  .mobile-nav-wrapper {
    position: fixed;
    z-index: 9999;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0 2rem;
    .menus {
      display: grid;
      grid-gap: 3rem;
      margin-top: 7rem;
      h3 {
        margin: 0 auto;
        font-size: 1.7rem;
        font-weight: bold;
      }
    }
  }
  .nav-mobile {
    color: #7d7d7d;
  }
</style>

<script>
  import { fade, fly } from 'svelte/transition'
  export let segment;
  let open = false;
  function handleOpenMenu () {
    open = !open;
    console.log({ open })
  } 
</script>
{#if open}
<div transition:fly={{ x: -200 }} class="mobile-nav-wrapper">
  <div class="nav-mobile flex items-center justify-between">
    <div>
      <a href="." transition:fade>
        <img class="logo" src="/logo.svg" alt="Hatch Essentials" />
      </a>
    </div>
    <div on:click={handleOpenMenu}>
       <svg class="fill-current"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"> 
        {#if open }
          <path transition:fade d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
        {:else}
          <path transition:fade d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        {/if}
      </svg>
    </div>
  </div> 
  <div class="container mx-auto text-center">
    <div class="menus">
      <div>
        <a on:click={handleOpenMenu} href=".">
          <h3>Home</h3>
        </a>
      </div>
      <div>
        <a on:click={handleOpenMenu} href="essential-oils-101">
          <h3>Essential Oils 101</h3>
        </a>
      </div>
      <div>
        <a on:click={handleOpenMenu} href="pursue-your-dreams">
          <h3>Pursue Your Dreams</h3>
        </a>
      </div>
      <div>
        <a on:click={handleOpenMenu} href="about-hatch">
          <h3>About Hatch</h3>
        </a>
      </div>
      <div>
        <a on:click={handleOpenMenu} href="the-blog">
          <h3>The Blog</h3>
        </a>
      </div>
      <div>
        <a href="https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member">
          <h3>Begin Now</h3>
        </a>
      </div>
    </div>
  </div>
</div>
{/if}
<nav class="main-nav">
  <div class="container mx-auto">
    <div class="nav-mobile flex items-center justify-between">
      <div>
        {#if !open}
        <a href="." transition:fade >
          <img class="logo" src="/logo.svg" alt="Hatch Essentials" />
        </a>
        {/if}
      </div>
      <div on:click={handleOpenMenu}>
         <svg class="fill-current"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"> 
          {#if open }
            <path transition:fly={{ x: -100 }} d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
          {:else}
            <path transition:fly={{ x: 100 }} d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          {/if}
        </svg>
      </div>
    </div> 
    <div class="nav-pc flex items-center justify-between">
      <div class="flex items-center">
        <a href="." rel="prefetch">
          <img class="logo" src="/logo.svg" alt="Hatch Eessentials"/>
        </a>
      </div>
      <div>
        <ul class="flex hatch-nav">
          <li>
            <a href="."  aria-current={segment === undefined ? 'page' : undefined}>Home
            {#if segment === undefined}
                  <svg class="fill-current nav-item nav-item-1" xmlns="http://www.w3.org/2000/svg" width="68" height="40.195" viewBox="0 0 68 40.195">
                    <path id="Path_1233" data-name="Path 1233" d="M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z" transform="translate(-0.061 -140.268)"/>
                  </svg>
              {:else}
                  <svg class="fill-current nav-item nav-item-1" xmlns="http://www.w3.org/2000/svg" width="68" height="26.292" viewBox="0 0 68 13.195">
                  <path id="Asset_9" data-name="Asset 9" d="M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z" transform="translate(-9.8 -25.1)"/>
                </svg>
              {/if}
              </a>
          </li>
          <li>
            <a
              aria-current={segment === 'essential-oils-101' ? 'page' : undefined}
              rel="prefetch"
              href="essential-oils-101">
              Essential Oils 101
            
              {#if segment === 'essential-oils-101'}
                  <svg class="fill-current nav-item nav-item-2" xmlns="http://www.w3.org/2000/svg" width="68" height="40.195" viewBox="0 0 68 40.195">
                    <path id="Path_1233" data-name="Path 1233" d="M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z" transform="translate(-0.061 -140.268)"/>
                  </svg>
              {:else}
                  <svg class="fill-current nav-item nav-item-2" xmlns="http://www.w3.org/2000/svg" width="68" height="26.292" viewBox="0 0 68 13.195">
                  <path id="Asset_9" data-name="Asset 9" d="M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z" transform="translate(-9.8 -25.1)"/>
                </svg>
              {/if}
              </a>
          </li>
          <li>
            <a aria-current={segment === 'pursue-your-dreams' ? 'page' : undefined} rel="prefetch" href="pursue-your-dreams" >Pursue Your Dreams
            {#if segment === 'pursue-your-dreams'}
                  <svg class="fill-current nav-item nav-item-3" xmlns="http://www.w3.org/2000/svg" width="68" height="40.195" viewBox="0 0 68 40.195">
                    <path id="Path_1233" data-name="Path 1233" d="M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z" transform="translate(-0.061 -140.268)"/>
                  </svg>
              {:else}
                  <svg class="fill-current nav-item nav-item-3" xmlns="http://www.w3.org/2000/svg" width="68" height="26.292" viewBox="0 0 68 13.195">
                  <path id="Asset_9" data-name="Asset 9" d="M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z" transform="translate(-9.8 -25.1)"/>
                </svg>
              {/if}
              </a>
          </li>
          <li> 
            <a aria-current={segment === 'about-hatch' ? 'page' : undefined} rel="prefetch" href="about-hatch" >About Hatch
            {#if segment === 'about-hatch'}
                  <svg class="fill-current nav-item nav-item-4" xmlns="http://www.w3.org/2000/svg" width="68" height="40.195" viewBox="0 0 68 40.195">
                    <path id="Path_1233" data-name="Path 1233" d="M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z" transform="translate(-0.061 -140.268)"/>
                  </svg>
              {:else}
                  <svg class="fill-current nav-item nav-item-4" xmlns="http://www.w3.org/2000/svg" width="68" height="26.292" viewBox="0 0 68 13.195">
                  <path id="Asset_9" data-name="Asset 9" d="M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z" transform="translate(-9.8 -25.1)"/>
                </svg>
              {/if}
              </a>
          </li>
          <li>
            <a aria-current={segment === 'the-blog' ? 'page' : undefined} rel="prefetch" href="the-blog" >The Blog
             {#if segment === 'the-blog'}
                  <svg class="fill-current nav-item nav-item-5" xmlns="http://www.w3.org/2000/svg" width="68" height="40.195" viewBox="0 0 68 40.195">
                    <path id="Path_1233" data-name="Path 1233" d="M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z" transform="translate(-0.061 -140.268)"/>
                  </svg>
              {:else}
                  <svg class="fill-current nav-item nav-item-5" xmlns="http://www.w3.org/2000/svg" width="68" height="26.292" viewBox="0 0 68 13.195">
                  <path id="Asset_9" data-name="Asset 9" d="M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z" transform="translate(-9.8 -25.1)"/>
                </svg>
              {/if}
              </a>
          </li>
          <li>
            <a aria-current={segment === 'begin-now' ? 'page' : undefined} target="_blank" href="https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member" >Begin Now
              
              {#if segment === 'begin-now'}
                  <svg class="fill-current nav-item nav-item-6" xmlns="http://www.w3.org/2000/svg" width="68" height="40.195" viewBox="0 0 68 40.195">
                    <path id="Path_1233" data-name="Path 1233" d="M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z" transform="translate(-0.061 -140.268)"/>
                  </svg>
              {:else}
                  <svg class="fill-current nav-item nav-item-6" xmlns="http://www.w3.org/2000/svg" width="68" height="26.292" viewBox="0 0 68 13.195">
                  <path id="Asset_9" data-name="Asset 9" d="M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z" transform="translate(-9.8 -25.1)"/>
                </svg>
              {/if}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

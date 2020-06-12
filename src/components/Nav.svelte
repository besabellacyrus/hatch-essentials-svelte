<script>
  export let segment;
</script>

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
     svg {
        margin: 0 auto;
        width: 3rem;
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
  }
  nav {
    background-color: #fbf6f4;
    ul {
      font-size: 0.6rem;
      font-weight: bold;
    }
  }
  .nav-mobile {
    height: 5rem;
    svg {
      height: 1.7rem;
    }
    @media screen and (min-width: 598px) {
      display: none;
    }
  }
  .nav-pc {
    height: 5rem;
    margin-top: 1rem;
    @media screen and (max-width: 599px) {
      display: none;
    }
  }
  .nav-item {
    opacity: 0.6; 
    transition: 300ms all; 
    height: 2rem;
    position: relative; 
    top: 0.82rem;
      &:active {
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
</style>

<nav class="main-nav container mx-auto">
  <div class="nav-mobile flex items-center justify-between">
    <div>
      <img src="/logo.svg" alt="Hatch Essentials" />
    </div>
    <svg
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  </div> 
  <div class="nav-pc flex items-center justify-between">
    <div class="flex items-center">
      <a href=".">
        <img src="/logo.svg" alt="Hatch Eessentials"/>
      </a>
    </div>
    <div>
      <ul class="flex">
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
            href="/essential-oils-101">
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
          <a aria-current={segment === 'pursue-your-dreams' ? 'page' : undefined} href="/pursue-your-dreams" >Pursue Your Dreams
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
          <a aria-current={segment === 'about-hatch' ? 'page' : undefined} href="/about-hatch" >About Hatch
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
          <a aria-current={segment === 'the-blog' ? 'page' : undefined} href="/the-blog" >The Blog
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
          <a aria-current={segment === 'begin-now' ? 'page' : undefined} href="/begin-now" >Begin Now
            
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
</nav>

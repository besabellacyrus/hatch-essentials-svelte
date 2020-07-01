<script context="module">
  import client from "../lib/apollo";
  import { PAGE } from "../queries/page";

  let slug = "contact";

  export async function preload() {
    return {
      cache: await client.query({
        query: PAGE,
        variables: { slug }
      })
    };
  }
</script>

<script>
  import { restore, query } from "svelte-apollo";
  import DynamicBlock from "../components/page_elements/DynamicBlock.svelte";
  import TransitionWrapper from "../components/TransitionWrapper.svelte";
  import BecomeMember from "../components/page_elements/BecomeMember.svelte";
  import SocialMediaIcons from "../components/page_elements/SocialMediaIcons.svelte";

  export let cache;
  export let slug;
  restore(client, PAGE, cache.data);
  // TODO Uncommenting this part triggers a 500 error.
  // setClient(client);

  // query a subset of the preloaded (the rest if for Account)
  const pages = query(client, {
    query: PAGE,
    variables: { slug }
  });
</script>

<style lang="scss">
  .contact-form {
    max-width: 63rem;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #5d5d5d !important;
      opacity: 1; /* Firefox */
    }
    & form {
      color: #5d5d5d !important;
      margin-top: 5rem;
    }
    & input,
    textarea {
      border: 1px solid #5d5d5d !important;
      width: 100%;
      background-color: transparent;
      padding-left: 1rem;
    }
    label,
    p {
      font-family: "PlayFairRegular";
    }
  }
  .contact-checkbox {
    & > input {
      height: initial !important;
      width: 3rem !important;
    }
  }
</style>

<svelte:head>
  {#if cache}
    {@html cache.data['hatch_PageBy']['head_tags']['headTags']}
  {/if}
</svelte:head>

<TransitionWrapper>
  {#await $pages}
    <div class="loader">
      <p>Loading...</p>
    </div>
  {:then data}
    {#if data.data}
      {#each data.data['hatch_PageBy']['page']['fc'] as page, i}
        <DynamicBlock content={page.content} bgColor={page.backgroundColor} />
      {/each}
    {:else}
      <p>ERROR!!</p>
    {/if}
  {/await}
</TransitionWrapper>

<div class="container mx-auto text-center mt-20">
  <h1 class="mx-auto">Hello</h1>
  <h3 class="mx-auto px-5">
    Do you still have unanswered questions? I’m here to help.
  </h3>
  <h3 class="mx-auto mt-10">Let’s get social</h3>
  <SocialMediaIcons />
  <div class="mt-10 text-center px-5">
    <h3 class="mx-auto">
      Got some specific questions for me? Leave a message and I’ll get back to
      you faster than you can say LAVENDER.
    </h3>
  </div>
</div>
<div class="container mx-auto contact-form">
  <form action="" class="px-5">
    <label for="">Name*</label>
    <div class="flex justify-around mb-5">
      <input class="mr-5" type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
    </div>
    <label for="">Email*</label>
    <div class="flex justify-around">
      <input type="email" placeholder="Email" required />
    </div>
    <div class="contact-checkbox">
      <p class="text-left">Are you familiar with essential oils?</p>
      <input type="radio" id="essential-yes" name="essential" value="Yes" />
      <label for="essential-yes">Yes</label>
      <br />
      <input
        type="radio"
        id="essential-no"
        checked="checked"
        name="essential"
        value="No" />
      <label for="essential-no">No</label>
    </div>
    <div class="contact-checkbox">
      <p class="text-left">Are you a Young Living Member?</p>
      <input type="radio" id="member-yes" name="member" value="Yes" />
      <label for="member-yes">Yes</label>
      <br />
      <input
        type="radio"
        id="member-no"
        checked="checked"
        name="member"
        value="No" />
      <label for="member-no">No</label>
    </div>
    <div class="message-box">
      <p class="text-left">Message*</p>
      <textarea id="message" required />
    </div>
    <div class="mt-10 flex align-middle justify-center">
      <button>Send It</button>
    </div>
  </form>
</div>

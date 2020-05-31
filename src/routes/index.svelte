<script context="module">
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";

  const EVERYTHING = gql`
    {
      todos {
        data {
          id
          title
          completed
        }
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: EVERYTHING
      })
    };
  }
</script>

<script>
  import { setClient, restore, query } from "svelte-apollo";

  export let cache;
  restore(client, EVERYTHING, cache.data);
  // TODO Uncommenting this part triggers a 500 error.
  // setClient(client);

  // query a subset of the preloaded (the rest if for Account)
  const todos = query(client, { query: EVERYTHING });
</script>

<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

{#await $todos}
  <p>Loading...</p>
{:then result}
  {#if result.data}
    <ul>
      {#each result.data.todos.data as todo}
        <li>
          <p>
            <strong>ID: {todo.id}</strong>
            {todo.title}
            <input type="checkbox" checked={todo.completed} />
          </p>
        </li>
      {/each}
    </ul>
  {:else}
    <p>ERROR!!</p>
  {/if}
{/await}

<p>
  <strong>
    Try editing this file (src/routes/index.svelte) to test live reloading.
  </strong>
</p>

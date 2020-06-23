<script>
	import { subscriber } from "../../store/subscribe.js"
  let loading = false;

  async function handleSubmit (event) {
    let formData = new FormData();
    formData.append("your-name", event.target.name.value);
    formData.append("your-email", event.target.email.value);
    
    const res = await fetch('http://hatchessentials.com/wp-api/wp-json/contact-form-7/v1/contact-forms/86/feedback', {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
    console.log({ res })
  }
</script>

<style>
	
</style>

<div class="subscribe-wrapper">
  <div class="container mx-auto">
    <div class="subscribe">
      <div>
        <img src="/img/image-2.jpg" alt="">
      </div>
      <div class="subscribe-content">
        <div>
          <h2>Subscribe</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque nemo obcaecati, ab rerum optio esse suscipit, numquam ex vero aliquid dolorum illum atque consequuntur! Qui dolores, facilis error quidem possimus magnam esse expedita eos.</p>
          <div class="subscribe-form">
            <form on:submit|preventDefault="{handleSubmit}" >
              <input type="text" id="name" bind:value={$subscriber.name} placeholder="Your Name Here" required>
              <input type="email" id="email" bind:value={$subscriber.email} placeholder="Your Email Here" required>
              <button><em>Subscribe</em></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
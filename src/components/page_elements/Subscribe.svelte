<script>
  import { subscriber } from "../../store/subscribe.js";
  let loading = false;
  let sent = false;

  async function handleSubmit(event) {
    if (!sent) {
      let formData = new FormData();
      formData.append("your-name", event.target.name.value);
      formData.append("your-email", event.target.email.value);

      const res = await fetch(
        "http://hatchessentials.com/wp-api/wp-json/contact-form-7/v1/contact-forms/86/feedback",
        {
          method: "POST",
          body: formData
        }
      ).then(e => {
        if (e.statusText === "OK") {
          sent = true;
          $subscriber.name = "";
          $subscriber.email = "";
        }
      });
    }
  }
</script>

<style>

</style>

<div class="subscribe-wrapper">
  <div class="container mx-auto">
    <div class="subscribe">
      <div class="subscribe-image">
        <img
          src="http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/subscribe_new.jpg"
          alt="" />
      </div>
      <div class="subscribe-content">
        <div class="content">
          <h2>Subscribe</h2>
          <p>
            Are you ready to start learning about natural health?
            <br />
            Grab my FREE blueprint to get started now.
            <br />
            <!-- 3 WAYS “BEING CRUNCHY” CAN CHANGE YOUR LIFE FOR THE BETTER -->
          </p>
          <div>
            <script
              async
              data-uid="71d5fb048c"
              src="https://hatchessentials-naturalhealthblueprint.ck.page/71d5fb048c/index.js">

            </script>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

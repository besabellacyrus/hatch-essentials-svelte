<script>
  import { subscriber } from "../../store/member.js"
  let sent = false;
  
  async function handleSubmit (event) {
    if (!sent) {
      let formData = new FormData();
      formData.append("your-name", event.target.name.value);
      formData.append("your-email", event.target.location.value);
      formData.append("your-message", event.target.message.value);
      
      const res = await fetch('http://hatchessentials.com/wp-api/wp-json/contact-form-7/v1/contact-forms/89/feedback', {
        method: 'POST', 
        body: formData
      }).then(e => {
        if (e.statusText === 'OK') {
          sent = true;
          $subscriber.name = '';
          $subscriber.email = '';
          $subscriber.message = '';
        }
      })
    }
  }
</script>

<style lang="scss">
	.become-a-member-wrapper {
		margin: 2rem 0 2rem;
	}
	.become-a-member {
		display: grid;
    grid-template-columns: 1fr 1fr;
    @media screen and (max-width: 768px) {
    	display: flex;
  		flex-direction: column-reverse;
    	grid-template-columns: initial;
    }
    grid-gap: 1.5rem;
		.member-forms {
			display: flex;
    	align-items: center;
    	@media screen and (max-width: 768px) {
    		display: initial;
	    	grid-template-columns: initial;
    		height: 60rem;
	    }
	    form {
	    	@media screen and (max-width: 768px) {
	    		padding: 2rem;
	    	}
	    }
		}
    h3 {
    	padding: 0 1rem;
    }
    h2 {
    	max-width: initial;
    }
    & form {
    	display: grid;
    	grid-template-rows: 1fr;
    	grid-gap: 1rem;
    	width: 100%;
    	input, textarea {
    		width: 100% !important;
    	}
    	.upper {
    		display: grid;
    		grid-gap: 1rem;
    		& input {
    			height: 4rem;
    		}
    	}
    	.lower {
    		display: grid;
    		grid-gap: 1rem;
    		justify-items: right;
    		textarea {
    			width: 100%;
    		}
    	}
    	button {
    		&:hover {
    			color: #5d5d5d;
    		}
    	}
    }
    .become-a-member-content {
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	/*height: 26rem;*/
    	@media screen and (max-width: 768px) {
    		text-align: center;
    		h3 {
    			margin: 0 auto;
    		}
    	}
			h2 {
				white-space: initial;
				line-height: 1.3;
				padding: 0 1rem 1rem;
			}
    	p {
    		padding: 0 1rem 1rem;
    	}
    }
    input, textarea {
    	/*color: #959595 !important;*/
    	border: 1px solid #959595 !important;
    	padding-left: 1rem;
    }
    textarea {
    	/*color: #959595 !important;*/
    	padding-top: 0.5rem;
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
		  color: #959595 !important;;
		  opacity: 1; /* Firefox */
		}

		:-ms-input-placeholder { /* Internet Explorer 10-11 */
		  color: #959595 !important;;
		}

		::-ms-input-placeholder { /* Microsoft Edge */
		  color: #959595 !important;;
		}
	}
</style>

<div class="become-a-member-wrapper">
	<div class="container mx-auto">
		<div class="become-a-member">
			<div class="member-forms">
				<form on:submit|preventDefault="{handleSubmit}">
					<div class="upper">
						<input type="text" id="name" bind:value={$subscriber.name}  placeholder="Your Name Here">
						<input type="email" id="email" bind:value={$subscriber.email}  placeholder="Location">
					</div>
					<div class="lower">
						<textarea name="" id="message" cols="30" rows="10" bind:value={$subscriber.message}  placeholder="Message"></textarea>
						<button><em>Submit</em></button>
					</div>
				</form>
        {#if sent}
          <p>Thank you!</p>
        {/if}
			</div>
			<div class="become-a-member-content">
				<div>
					<h3>I WANT TO DO THIS NOW</h3>
					<h2>BECOME A MEMBER <br/> OF HATCH ESSENTIALS</h2>
					 <ul>
					 	<li>
					 		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p>
					 	</li>
					 	<li>
					 		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p>
					 	</li>
					 	<li>
					 		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p>
					 	</li>
					 	<li>
					 		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p>
					 	</li>
					 </ul>
				</div>
			</div>
		</div>
	</div>
</div>
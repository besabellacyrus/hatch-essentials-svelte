<script></script>

<style lang="scss">
	.become-a-member-wrapper {
		margin: 2rem 0 2rem;
	}
	.become-a-member {
		display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5rem;
		.member-forms {
			display: flex;
    	align-items: center;
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
    		/*color: #5d5d5d !important;*/
    	}
    	.upper {
    		display: grid;
    		grid-gap: 1rem;
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
    	height: 26rem;
			h2 {
				white-space: initial;
				line-height: 1.3;
				padding: 0 1rem 1rem;
			}
    	p {
    		font-size: 0.7rem;
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
				<form action="">
					<div class="upper">
						<input type="text" placeholder="Your Name Here">
						<input type="text" placeholder="Location">
					</div>
					<div class="lower">
						<textarea name="" id="" cols="30" rows="10" placeholder="Message"></textarea>
						<button><em>Submit</em></button>
					</div>
				</form>
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
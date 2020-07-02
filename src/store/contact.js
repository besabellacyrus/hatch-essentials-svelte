import { writable } from 'svelte/store';

export const contact = writable({
	first_name: "",
	last_name: "",
  email: "",
  essential_oils: "",
  living_member: "",
	message: ""
})
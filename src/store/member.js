import { writable } from 'svelte/store';

export const subscriber = writable({
	name: "",
	location: "",
	message: ""
})
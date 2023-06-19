// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@auth/sveltekit" />
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession: () => Promise<import('@auth/core').Session | null>;
			user: import('@prisma/client').User | null;
		} // interface PageData {}
		// interface Platform {}
	}
}

export {};

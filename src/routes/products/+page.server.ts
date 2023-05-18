import { db } from '$lib/db/db';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const user = await db
		.selectFrom('profile')
		.selectAll()
		.where('email', '=', session.user?.email as string)
		.executeTakeFirstOrThrow();

	if (!user) {
		throw redirect(303, '/login');
	}

	return {
		currentUser: user
	};
};

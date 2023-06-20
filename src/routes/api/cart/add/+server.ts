import { fail, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db/db';
import { nanoid } from 'nanoid';

export const GET: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();

	const { productId, quantity } = await request.json();

	if (!session) {
		throw redirect(303, '/login');
	}

	const user = await db
		.selectFrom('profile')
		.selectAll()
		.where('email', '=', session.user?.email as string)
		.executeTakeFirstOrThrow();

	// Convenient validation check:
	if (!productId) {
		// Again, always return { form } and things will just work.
		return fail(400, { message: 'Missing productId' });
	}

	if (!quantity) {
		// Again, always return { form } and things will just work.
		return fail(400, { message: 'Missing quantity' });
	}

	console.log('server form', productId, quantity, user.id);

	// add item to cart
	const data = await db
		.insertInto('cart')
		.values({
			productId: productId,
			quantity: parseInt(quantity),
			userId: user.id,
			createdAt: new Date().toDateString(),
			updatedAt: new Date().toDateString(),
			id: nanoid(12)
		})
		.returning('id')
		.executeTakeFirstOrThrow();

	console.log('server form', data);
	return new Response();
};

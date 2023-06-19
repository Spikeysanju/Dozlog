import { db, type Cart } from '$lib/db/db';
import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import prisma from '$lib/prisma/prisma';

export const load = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const products = await prisma.product.findMany();

	return {
		currentUser: session.user,
		products: products
	};
};

export const actions = {
	addToCart: async ({ request, locals, url }) => {
		const session = await locals.getSession();
		const formData = await request.formData();
		const productId = formData.get('productId') as string;
		const quantity = formData.get('quantity') as string;

		if (!session) {
			throw redirect(303, '/login');
		}

		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email as string
			}
		});

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
		const cart = await prisma.cart.create({
			data: {
				id: nanoid(12),
				productId: productId,
				quantity: parseInt(quantity),
				user: {
					connect: {
						id: user.id
					}
				},
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			}
		});

		console.log('item added to cart:', cart);

		return {
			status: 201,
			message: 'Added to cart'
		};
	}
};

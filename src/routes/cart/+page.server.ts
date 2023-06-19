import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma/prisma';

export const actions = {
	removeFromCart: async ({ request, locals, url }) => {
		const session = await locals.getSession();
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!session) {
			throw redirect(303, '/login');
		}

		if (!id) {
			return fail(400, { message: 'Missing cart id' });
		}

		// remove item from only user's cart (not all users)
		const data = await prisma.cart.delete({
			where: {
				id: id
			}
		});

		console.log('Item removed from cart:', data);

		return {
			status: 201,
			message: 'Removed from cart'
		};
	},
	orderCheckout: async ({ request, locals, url }) => {
		const session = await locals.getSession();
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!session) {
			throw redirect(303, '/login');
		}

		if (!id) {
			return fail(400, { message: 'Missing cart id' });
		}

		// remove item from cart
		const data = await prisma.cart.delete({
			where: {
				id: id
			}
		});

		console.log('Item moved to orders:', data);

		return {
			status: 201,
			message: 'Removed from cart'
		};
	}
};

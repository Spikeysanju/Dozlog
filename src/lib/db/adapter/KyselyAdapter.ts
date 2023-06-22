import { Kysely, SqliteAdapter } from 'kysely';
import type { Adapter } from '@auth/core/adapters';
import type { Database } from '$lib/db/db';
import { nanoid } from 'nanoid';

type ReturnData<T = never> = Record<string, Date | string | T>;

export function KyselyAdapter(db: Kysely<Database>): Adapter {
	const adapter = db.getExecutor().adapter;
	const supportsReturning = adapter.supportsReturning;
	const storeDatesAsISOStrings = adapter instanceof SqliteAdapter;

	/** Helper function to return the passed in object and its specified prop
	 * as an ISO string if SQLite is being used.
	 **/
	function coerceInputData<T extends Partial<Record<K, Date | null>>, K extends keyof T>(
		data: T,
		key: K
	) {
		const value = data[key];
		return {
			...data,
			[key]: value && storeDatesAsISOStrings ? value.toISOString() : value
		};
	}

	/**
	 * Helper function to return the passed in object and its specified prop as a date.
	 * Necessary because SQLite has no date type so we store dates as ISO strings.
	 **/
	function coerceReturnData<T extends Partial<ReturnData>, K extends keyof T>(
		data: T,
		key: K
	): Omit<T, K> & Record<K, Date>;
	function coerceReturnData<T extends Partial<ReturnData<null>>, K extends keyof T>(
		data: T,
		key: K
	): Omit<T, K> & Record<K, Date | null>;
	function coerceReturnData<T extends Partial<ReturnData<null>>, K extends keyof T>(
		data: T,
		key: K
	) {
		const value = data[key];
		return Object.assign(data, {
			[key]: value && typeof value === 'string' ? new Date(value) : value
		});
	}

	return {
		async createUser(data) {
			console.log('🏓 Creating user', JSON.stringify(data, null, 2));

			const userData = coerceInputData(data, 'emailVerified');
			const query = db.insertInto('profile').values({
				...userData,
				emailVerified: userData.emailVerified ?? null,
				id: nanoid(21)
			});
			const result = supportsReturning
				? await query.returningAll().executeTakeFirstOrThrow()
				: await query.executeTakeFirstOrThrow().then(async () => {
						return await db
							.selectFrom('profile')
							.selectAll()
							.where('email', '=', `${data.email}`)
							.executeTakeFirstOrThrow();
				  });
			return coerceReturnData(result, 'emailVerified');
		},
		async getUser(id) {
			console.log('🏓 Getting user');
			const result =
				(await db.selectFrom('profile').selectAll().where('id', '=', id).executeTakeFirst()) ??
				null;
			if (!result) return null;
			return coerceReturnData(result, 'emailVerified');
		},
		async getUserByEmail(email: string) {
			console.log('🏓 Getting user by email', email);

			const result =
				(await db
					.selectFrom('profile')
					.selectAll()
					.where('email', '=', email)
					.executeTakeFirst()) ?? null;
			if (!result) return null;

			console.log('🏓 Getting user by email result', result);

			return coerceReturnData(result, 'emailVerified');
		},
		async getUserByAccount({ providerAccountId, provider }) {
			console.log('🏓 Getting user by account', providerAccountId, provider);

			const result =
				(await db
					.selectFrom('profile')
					.innerJoin('account', 'profile.id', 'account.userId')
					.selectAll('profile')
					.where('account.providerAccountId', '=', providerAccountId)
					.where('account.provider', '=', provider)
					.executeTakeFirst()) ?? null;

			console.log('🏓 Getting user by account result', result);

			if (!result) return null;
			return coerceReturnData(result, 'emailVerified');
		},
		async updateUser({ id, ...user }) {
			if (!id) throw new Error('User not found');
			const userData = coerceInputData(user, 'emailVerified');
			const query = db.updateTable('profile').set(userData).where('id', '=', id);
			const result = supportsReturning
				? await query.returningAll().executeTakeFirstOrThrow()
				: await query.executeTakeFirstOrThrow().then(async () => {
						return await db
							.selectFrom('profile')
							.selectAll()
							.where('id', '=', id)
							.executeTakeFirstOrThrow();
				  });
			return coerceReturnData(result, 'emailVerified');
		},
		async deleteUser(userId) {
			await db.deleteFrom('profile').where('profile.id', '=', userId).execute();
		},
		async linkAccount(account) {
			console.log('🏓 Linking account', JSON.stringify(account, null, 2));
			await db
				.insertInto('account')
				.values({
					...account,
					id: nanoid(21)
				})
				.executeTakeFirstOrThrow();
		},
		async unlinkAccount({ providerAccountId, provider }) {
			await db
				.deleteFrom('account')
				.where('account.providerAccountId', '=', providerAccountId)
				.where('account.provider', '=', provider)
				.executeTakeFirstOrThrow();
		},
		async createSession(data) {
			console.log('🏓 Creating session', JSON.stringify(data, null, 2));
			const sessionData = coerceInputData(data, 'expires');
			const query = db.insertInto('session').values({
				...sessionData,
				id: nanoid(21)
			});
			const result = supportsReturning
				? await query.returningAll().executeTakeFirstOrThrow()
				: await (async () => {
						await query.executeTakeFirstOrThrow();
						return await db
							.selectFrom('session')
							.selectAll()
							.where('sessionToken', '=', sessionData.sessionToken)
							.executeTakeFirstOrThrow();
				  })();

			console.log('🏓 Creating session result', JSON.stringify(result, null, 2));
			return coerceReturnData(result, 'expires');
		},
		async getSessionAndUser(sessionTokenArg) {
			console.log('🏓 Getting session and user');
			const result = await db
				.selectFrom('session')
				.innerJoin('profile', 'profile.id', 'session.userId')
				.selectAll('profile')
				.select([
					'session.id as sessionId',
					'session.userId',
					'session.sessionToken',
					'session.expires'
				])
				.where('session.sessionToken', '=', sessionTokenArg)
				.executeTakeFirst();
			if (!result) return null;
			const { sessionId: id, userId, sessionToken, expires, ...user } = result;

			console.log('🏓 Getting session and user result', JSON.stringify(result, null, 2));

			return {
				user: coerceReturnData({ ...user }, 'emailVerified'),
				session: coerceReturnData({ id, userId, sessionToken, expires }, 'expires')
			};
		},
		async updateSession(session) {
			const sessionData = coerceInputData(session, 'expires');
			const query = db
				.updateTable('session')
				.set(sessionData)
				.where('session.sessionToken', '=', session.sessionToken);
			const result = supportsReturning
				? await query.returningAll().executeTakeFirstOrThrow()
				: await query.executeTakeFirstOrThrow().then(async () => {
						return await db
							.selectFrom('session')
							.selectAll()
							.where('session.sessionToken', '=', sessionData.sessionToken)
							.executeTakeFirstOrThrow();
				  });
			return coerceReturnData(result, 'expires');
		},
		async deleteSession(sessionToken) {
			await db
				.deleteFrom('session')
				.where('session.sessionToken', '=', sessionToken)
				.executeTakeFirstOrThrow();
		},
		async createVerificationToken(verificationToken) {
			const verificationTokenData = coerceInputData(verificationToken, 'expires');
			const query = db.insertInto('verificationToken').values(verificationTokenData);
			const result = supportsReturning
				? await query.returningAll().executeTakeFirstOrThrow()
				: await query.executeTakeFirstOrThrow().then(async () => {
						return await db
							.selectFrom('verificationToken')
							.selectAll()
							.where('token', '=', verificationTokenData.token)
							.executeTakeFirstOrThrow();
				  });
			return coerceReturnData(result, 'expires');
		},
		async useVerificationToken({ identifier, token }) {
			const query = db
				.deleteFrom('verificationToken')
				.where('verificationToken.token', '=', token)
				.where('verificationToken.identifier', '=', identifier);
			const result = supportsReturning
				? (await query.returningAll().executeTakeFirst()) ?? null
				: await db
						.selectFrom('verificationToken')
						.selectAll()
						.where('token', '=', token)
						.executeTakeFirst()
						.then(async (res) => {
							await query.executeTakeFirst();
							return res;
						});
			if (!result) return null;
			return coerceReturnData(result, 'expires');
		}
	};
}

/**
 * Wrapper over the original `Kysely` class in order to validate the passed in
 * database interface. A regular Kysely instance may also be used, but wrapping
 * it ensures the database interface implements the fields that Auth.js
 * requires. When used with `kysely-codegen`, the `Codegen` type can be passed as
 * the second generic argument. The generated types will be used, and
 * `AuthedKysely` will only verify that the correct fields exist.
 **/
export class AuthedKysely<DB extends T, T = Database> extends Kysely<DB> {}

export type Codegen = {
	[K in keyof Database]: { [J in keyof Database[K]]: unknown };
};

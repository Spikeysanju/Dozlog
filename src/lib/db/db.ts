import { type Generated, type ColumnType, PostgresDialect, Kysely } from 'kysely';
import { DATABASE_URL } from '$env/static/private';
import pg from 'pg';
import { AuthedKysely } from '$lib/adapter/KyselyAdapter';
const { Pool } = pg;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Profile {
	id: Generated<string>;
	name: string | null;
	email: string;
	emailVerified: Timestamp | null;
	image: string | null;
}

export interface Account {
	id: string;
	userId: string;
	type: string;
	provider: string;
	providerAccountId: string;
	refresh_token: string | null;
	access_token: string | null;
	expires_at: number | null;
	token_type: string | null;
	scope: string | null;
	id_token: string | null;
	session_state: string | null;
	oauth_token_secret: string | null;
	oauth_token: string | null;
}
export interface Session {
	id: string;
	sessionToken: string;
	expires: Timestamp;
	userId: string;
}
export interface VerificationToken {
	identifier: string;
	token: string;
	expires: Timestamp;
}

export interface Product {
	id: Generated<string>;
	name: string;
	description: string | null;
	image: string | null;
	price: number;
	userId: string;
	createdAt: Generated<Timestamp>;
	updatedAt: Timestamp;
}

export interface Cart {
	id: Generated<string>;
	userId: string;
	productId: string;
	quantity: number;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

// order cancellation with a reason and a user id reason can be a enum of reasons
export enum OrderCancellationReason {
	OUT_OF_STOCK = 'Out of stock',
	NOT_ENOUGH_MONEY = 'Not enough money',
	BOUGHT_SOMEWHERE_ELSE = 'Bought somewhere else',
	OTHER = 'Other'
}

export interface OrderCancellation {
	id: Generated<string>;
	userId: string;
	orderId: string;
	reason: OrderCancellationReason;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

// order status with a enum of statuses and a user id
export enum OrderStatus {
	PROCESSING = 'PROCESSING',
	DELIVERING = 'DELIVERING',
	DELIVERED = 'DELIVERED',
	CANCELLED = 'CANCELLED'
}

// create orders with multiple product ids and quantities and a total price and a user id
export interface Order {
	id: Generated<string>;
	userId: string;
	productId: any;
	quantity: number;
	totalPrice: number;
	orderStatus: OrderStatus;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface OrderStatusUpdate {
	id: Generated<string>;
	userId: string;
	orderId: string;
	status: OrderStatus;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface Database {
	product: Product;
	cart: Cart;
	profile: Profile;
	account: Account;
	session: Session;
	verificationToken: VerificationToken;
	order: Order;
	orderCancellation: OrderCancellation;
}

// You'd create one of these when you start your app.
// export const db = new Kysely<Database>({
// 	dialect: new PostgresDialect({
// 		pool: new Pool({
// 			connectionString: DATABASE_URL
// 		})
// 	})
// });

export const db = new AuthedKysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: DATABASE_URL
		})
	})
});

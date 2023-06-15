![Alt text](image.png)
## Welcome to Dozlog
Dozlog is an sample mini ecommerce application to mimic the realtime admin dashboard with postgres & dozer js library and built with svelte. This application features how you can build your own realtime admin dashboard with dozer & sveltekit.


## Getting Started
We need few things to setup initial to run this application. 

1. Create a new  `.env`  file and below values. (Checkout `.env.local` for an example)
```bash
# DATABASE CONFIG
DATABASE_URL='postgresql://[database]:[password]@localhost:5432/postgres'

# AUTHJS CONFIG
AUTH_SECRET="64dac3fe28fbf242d11982565d165583" // Use this to generate secret - https://generate-secret.vercel.app/32
AUTH_TRUST_HOST="true"

# GITHUB CONFIG
GITHUB_ID="YOUR ID HERE"
GITHUB_SECRET="YOUR GITHUB SECRET HERE"
```

2. Once you've created a `.env` and you need to setup the seed query in your postgres db. Run the below query on your postgres console to create tables.
```seed.sql
CREATE TABLE IF NOT EXISTS profile (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    "emailVerified" TIMESTAMP,
    image VARCHAR(255)

);

CREATE TABLE IF NOT EXISTS account (
    id VARCHAR(255) PRIMARY KEY,
    "userId" VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    access_token VARCHAR(255),
    expires_at BIGINT,
    token_type VARCHAR(255),
    scope VARCHAR(255),
    id_token VARCHAR(255),
    session_state VARCHAR(255),
    oauth_token_secret VARCHAR(255),
    oauth_token VARCHAR(255)

);

CREATE TABLE IF NOT EXISTS session (
    id VARCHAR(255) PRIMARY KEY,
    "sessionToken" VARCHAR(255) NOT NULL,
    expires TIMESTAMP NOT NULL,
    userId VARCHAR(255) NOT NULL

);

CREATE TABLE IF NOT EXISTS verificationToken (
    identifier VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(512) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    productId VARCHAR(255) NOT NULL,
    quantity INT,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    productId VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    totalPrice INT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);

INSERT INTO "Product" (id, name, description, price, "userId", "createdAt", "updatedAt") 
VALUES ('23323232', 'Dummy Product', null, 10.99, '7pI_uRRxAmhhg7XCLICNF', '2022-02-22 00:00:00', '2022-02-22 00:00:00');

ALTER TABLE product
ALTER COLUMN price TYPE numeric(10,2) USING price::numeric(10,2);
ALTER TABLE product ALTER COLUMN price TYPE INTEGER USING price::INTEGER;
```

Once you're ran this query successfully you can able to see tables in your database.

3. Once you've completed above steps, get into project & in your project terminal enter below commands.

```bash
npm install
npm run dev
```

Now open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Learn More

To learn more about Dozer JS, take a look at the following resources:
- [Dozer JS Documentation](https://getdozer.io/) - learn about Dozer JS features and API.
- [Learn Dozer JS](https://getdozer.io/) - an interactive Dozer JS tutorial.

## Deploy on Vercel

The easiest way to deploy your SvelteKit app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [SvelteKit deployment documentation](https://nextjs.org/docs/deployment) for more details.
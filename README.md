![Alt text](image.png)

## Welcome to Dozlog

Dozlog is a mini ecommerce application that simulates a real-time admin dashboard. It is built using postgres and the dozer js library, and developed with svelte. This application showcases how you can create your own real-time admin dashboard using dozer and sveltekit.

## Getting Started

To run this application, follow these steps:

1. Create a new `.env` file and add the following values (refer to `.env.local` for an example):

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

2. Once you have created the `.env` file, you need to set up the seed query in your postgres database. Run the following query in your postgres console to create the tables:

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


ALTER TABLE product ALTER COLUMN price TYPE INTEGER USING price::INTEGER;

# To add dummy products to database you can run

INSERT INTO product (id, name, description, price, image, "userId", "createdAt", "updatedAt")
VALUES
    ('1', 'Product 1', 'Description for Product 1', 10, 'image1.jpg', 'your-user-id', '2021-01-01 10:00:00', '2021-01-01 10:00:00'),
    ('2', 'Product 2', 'Description for Product 2', 20, 'image2.jpg', 'your-user-id', '2021-01-02 11:00:00', '2021-01-02 11:00:00'),
    ('3', 'Product 3', 'Description for Product 3', 30, 'image3.jpg', 'your-user-id', '2021-01-03 12:00:00', '2021-01-03 12:00:00'),
    ('4', 'Product 4', 'Description for Product 4', 40, 'image4.jpg', 'your-user-id', '2021-01-04 13:00:00', '2021-01-04 13:00:00'),
    ('5', 'Product 5', 'Description for Product 5', 50, 'image5.jpg', 'your-user-id', '2021-01-05 14:00:00', '2021-01-05 14:00:00');

```

3. After successfully running the query, you will be able to see the tables in your database.

4. Go to your project directory in the terminal and run the following commands:

```bash
npm install
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to see the result.

## Learn More

To learn more about Dozer JS, take a look at the following resources:

- [Dozer JS Documentation](https://getdozer.io/) - learn about Dozer JS features and API.
- [Learn Dozer JS](https://getdozer.io/) - an interactive Dozer JS tutorial.

## Deploy on Vercel

The easiest way to deploy your SvelteKit app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [SvelteKit deployment documentation](https://nextjs.org/docs/deployment) for more details.

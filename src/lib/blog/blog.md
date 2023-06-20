Building powerful data apps typically requires an extensive amount of time, careful planning, and integration of multiple tools. In our organization, we had the need to create an admin dashboard for tracking statistics related to our product.

Initially, we considered building the dashboard from scratch, but we had specific requirements in mind:

1. It should be easy to build.
2. It should have the capability to scale effortlessly.
3. It should be simple to maintain over time.
4. Real-time options would be a bonus.

We explored various tech stacks to find the right solution, and then we came across Dozer. This caught our attention after hearing positive discussions about it on Hackernews. Intrigued, we decided to give it a try, and the results were impressive. To provide a practical demonstration, we created a mini e-commerce app with an admin panel using Dozer.

## 📺 Demo

Demo of Dozlog – powered by Dozer
-> url goes here

## ⚡ What's Dozer?

Dozer is a solution that simplifies the handling of fragmented data. It offers a unified API layer that consolidates data from multiple sources, making it easier to access and integrate. By doing so, Dozer reduces the burden on operational databases, resulting in improved efficiency. 

Moreover, with just a single YAML configuration, you can effortlessly communicate with your Postgres database, perform aggregation queries, create REST API endpoints, and execute filter queries. It streamlines the entire process and provides a seamless experience for data handling and integration.

👀 Take a look at the below image.

![[SCR-20230608-mdll.png]]

Creating real-time data apps is as simple as configuring a single `YAML` file. With this straightforward setup, you can easily develop applications that display data in real-time. The simplicity of the process allows you to focus on building the functionalities and features you need, without getting overwhelmed by complex configurations.


## 🤔 Why Dozer?

- Simplifying Complex Problems: Dozer offers a straightforward solution to tackle complex problems.
- Streamlining Database Connections and Change Tracking: Dozer simplifies the process of connecting databases and tracking changes.
- Efficient Database Management: Dozer makes it easier to manage and work with database systems efficiently.
- Real-time Tracking: Dozer keeps you updated with real-time changes happening in your database.

Okay, now lets build a quick e-commerce app with SvelteKit & Dozer.

## ⬇️ Installing Dozer

To start using Dozer, you will need to install the Dozer client on your computer. Follow these steps to install it:

- Installation process:

   Execute the following command:
   
   ```bash
   Dozer version command
   ```
   
   This command will verify if the Dozer client has been successfully installed on your computer. Once installed, proceed to set up the database and configure the Dozer YAML file.

## 💻 Configuring the Dozer YAML file

Dozer operates with a single YAML file. To begin, create a new file named `dozer-config.yaml` (you can choose a different name if desired). Open the file and insert the following configuration:

```dozer.yaml
cache_max_map_size: 2147483648
connections:
- name: stic_conn
config: !Postgres
user: spikey
password: sticai123
host: localhost
port: 5432
database: postgres



sql: |
SELECT
SUM(p.price * c.quantity) AS total_cart_value,
5.32 AS shipping_est,
9.45 AS tax_est,
SUM(p.price * c.quantity) + 5.00 + 8.32 AS total_cart_value_with_tax,
COUNT(*) AS total_items,
5.32 * COUNT(*) AS total_shipping,
9.45 * COUNT(*) AS total_tax
INTO cart_stats
FROM cart c
JOIN product p ON c."productId" = p.id;


SELECT
SUM("totalPrice") AS total_price,
SUM(quantity) AS total_quantity,
COUNT(DISTINCT "userId") AS unique_users_count,
ROUND(CAST(SUM(quantity) AS FLOAT) / COUNT(DISTINCT "userId")) AS avg_order_per_user
INTO order_stats
FROM "order";
SELECT * FROM into allproducts "product";

sources:
- name: product
table_name: product
connection: !Ref stic_conn
columns:

- name: cart
table_name: cart
connection: !Ref stic_conn
columns:

- name: profile
table_name: profile
connection: !Ref stic_conn

columns:
- name: order
table_name: order
connection: !Ref stic_conn
columns:


endpoints:
- name: product
path: /product
table_name: product

- name: cart
path: /cart
table_name: cart

- name: profile
path: /profile
table_name: profile

- name: order
path: /order
table_name: order

- name: cart_stats
path: /cart_stats
table_name: cart_stats

- name: order_stats
path: /order_stats
table_name: order_stats

- name: allproducts
path: /all_products
table_name: all_products
```

If we delve deeper into the Dozer YAML file, we can identify four key configuration sections that form its foundation:

- 🌐 **Connection**: This section establishes the connection between Dozer and the database.
- ✍️ **Sql**: In this section, you can compose SQL queries to retrieve data from the database.
- 🕸️ **Sources**: Sources define the tables and databases that Dozer will track changes for.
- ⛳ **Endpoints**: Endpoints function similarly to REST API endpoints and are responsible for connecting sources and executing SQL queries.

By leveraging these four essential components, we can configure Dozer to seamlessly communicate with our Postgres database.

### 🌐 Connections

Connections serve as the means to establish connections with our Postgres database. They act as a communication channel between Dozer and the database. In this section, you will define the name and configuration details for the connection.

For example, you can define the name of the connection as well as the necessary details such as the host, port, database name, username, and password to establish a successful connection with the Postgres database.

```dozer-config.yaml
connections:
- name: stic_conn
config: !Postgres
user: sanju
password: helloworld
host: localhost
port: 5432
database: postgres
```

==Note: One of the impressive features of Dozer is that you can connect multiple Postgres instances within a single Dozer file. This flexibility allows you to seamlessly manage and work with multiple databases using Dozer.

### ✍️ Sql

The SQL block in Dozer.yaml is used for writing read-only SQL queries. These queries allow you to retrieve data from multiple tables and columns to obtain the desired results.

For example, you can utilize the SQL block to create aggregation queries that combine data from different tables to perform calculations or generate reports.

To define `Sql` in Dozer, follow these steps:

```dozer-config.yaml
sql: |
SELECT
SUM(p.price * c.quantity) AS total_cart_value,
5.32 AS shipping_est,
9.45 AS tax_est,
SUM(p.price * c.quantity) + 5.00 + 8.32 AS total_cart_value_with_tax,
COUNT(*) AS total_items,
5.32 * COUNT(*) AS total_shipping,
9.45 * COUNT(*) AS total_tax
INTO cart_stats
FROM cart c
JOIN product p ON c."productId" = p.id;


SELECT
SUM("totalPrice") AS total_price,
SUM(quantity) AS total_quantity,
COUNT(DISTINCT "userId") AS unique_users_count,
ROUND(CAST(SUM(quantity) AS FLOAT) / COUNT(DISTINCT "userId")) AS avg_order_per_user
INTO order_stats
FROM "order";
SELECT * FROM into allproducts "product";
```

Alright, we will discuss this concept in more detail in the upcoming steps. Let's continue with the next topic.

### 🕸️ Sources

Sources are used to establish a connection between tables and databases. They allow Dozer to track changes specifically for those sources. For example, if you have a database with 10 tables but only want to monitor 7 of them, you will need to define those specific sources for Dozer.

To define sources in `Dozer`, follow these steps:

```dozer-config.yaml

```

### ⛳ Endpoints

Endpoints in Dozer function similarly to REST API endpoints. To create an endpoint, you need to provide a unique name, a path, and the name of the table.

When working with frontend applications or REST APIs, endpoints are essential for retrieving specific results from Dozer.

Endpoints play a crucial role in connecting sources and executing SQL queries. They serve as the bridge between your application and the data you want to access in Dozer.

To define `Endpoints` in Dozer, follow these steps:

```dozer-config.yaml
endpoints:
- name: product
path: /product
table_name: product

- name: cart
path: /cart
table_name: cart

- name: profile
path: /profile
table_name: profile

- name: order
path: /order
table_name: order

- name: cart_stats
path: /cart_stats
table_name: cart_stats

- name: order_stats
path: /order_stats
table_name: order_stats

- name: allproducts
path: /all_products
table_name: all_products
```

Now we have successfully setup our Dozer configuration in yaml file. In order to spin up connection. Run the following command.

```bash
dozer -c dozer-config.yaml
```

![[Pasted image 20230616005701.png]]
Once Dozer is running, you will be able to observe the timestamps indicating the duration it took to load each endpoint. This will help you track the performance and response time of each endpoint.

### 🌀 Curl request

Dozer supports Rest API endpoints including documentation support. Here's an example to call endpoints.

```bash
curl -X POST http://localhost:8080/product/query \
--header 'Content-Type: application/json' \
--data-raw '{"$limit":3}'

# Response
[{"id":"5","name":"Product 5","description":"Description of product 5","price":50,"image":"https://images.pexels.com/photos/11232184/pexels-photo-11232184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","userId":"MWFvqNBYKVf48lSIotq0d","createdAt":"2022-01-05T00:00:05.000Z","updatedAt":"2022-01-05T00:00:05.000Z","__dozer_record_id":0,"__dozer_record_version":1},{"id":"2","name":"Product 2","description":"Description of product 2","price":20,"image":"https://images.pexels.com/photos/1879096/pexels-photo-1879096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","userId":"MWFvqNBYKVf48lSIotq0d","createdAt":"2022-01-02T00:00:02.000Z","updatedAt":"2022-01-02T00:00:02.000Z","__dozer_record_id":1,"__dozer_record_version":1},{"id":"4","name":"Product 4","description":"Description of product 4","price":40,"image":"https://images.pexels.com/photos/11281577/pexels-photo-11281577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","userId":"MWFvqNBYKVf48lSIotq0d","createdAt":"2022-01-04T00:00:04.000Z","updatedAt":"2022-01-04T00:00:04.000Z","__dozer_record_id":2,"__dozer_record_version":1},{"id":"1","name":"Product 1","description":"Description of product 1","price":10,"image":"https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1600","userId":"MWFvqNBYKVf48lSIotq0d","createdAt":"2022-01-01T00:00:01.000Z","updatedAt":"2022-01-01T00:00:01.000Z","__dozer_record_id":3,"__dozer_record_version":1},{"id":"3","name":"Product 3","description":"Description of product 3","price":30,"image":"https://images.pexels.com/photos/1879101/pexels-photo-1879101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","userId":"MWFvqNBYKVf48lSIotq0d","createdAt":"2022-01-03T00:00:03.000Z","updatedAt":"2022-01-03T00:00:03.000Z","__dozer_record_id":4,"__dozer_record_version":1}]
```

You can learn more about Dozer REST API from [Using REST APIs | Dozer | Start building real-time data apps in minutes](https://getdozer.io/docs/querying/rest)

Now that you have an idea of how to set up Dozer and understand its functionality, you have all the necessary knowledge. Now, we can shift our focus towards frontend development in order to build Dozlog.

## ✳️ Working with Dozer JS

In above we have seen how Dozer JS works & Setting up Dozer. Now you may have queries how to use Dozer on any frontend frameworks.

The solution is Dozer JS. it's an official JS library to work seamlessly with Dozer.

You can install Dozer JS by running follwing command:

```bash
npm i @getdozer/dozerjs
```

Now let's see different usecases that how Dozer JS makes it easier to build realtime data apps. We gonna see about

1. 📥 Data fetching
2. ⚡️ Realtime data fetching
3. 🧮 Aggregation queries
4. 🔍 Filters & Queries
5. 🌐 Rest API's etc.

### 📥 Data fetching

In order to fetch data you can simple initialise the dozer client and call the endpoint which you want to get data. In our case it's `products`

So this is how it looks like:

```typescript
// State to store the data
let productState: any = {
  records: [],
  fields: []
};

// Create a new Dozer client
const dozer = new ApiClient('product');

// Retrieve the records and fields using the Dozer client
dozer.query().then(([fields, records]) => {
  productState.records = records;
  productState.fields = fields;
});

// Display the product cards
{#each productState.records as item}
  <ProductCard
    title={item.name}
    description={item.description}
    price={item.price}
    image={item.image}
    type="product"
    quantity={1}
  />
{/each}
```

Above will get list of products from product endpoint and will display it on frontend.

## ⚡ Real-time Data Fetching

In the previous example of `Data Fetching`, it only demonstrated a basic way of retrieving data. However, the results obtained were not real-time data. This means that if any changes occur in the database values, those changes will not be reflected here.

But with Dozer, you can easily incorporate a stream to track changes to the data in real-time.

To achieve this, you just need to make a minor modification to the code provided above.

```TypeScript

// State to store the data
let productState: any = {
  records: [],
  fields: []
};

// Initialize the Dozer client
const dozer = new ApiClient('product');
dozer.query().then(([fields, records]) => {
  productState.records = records;
  productState.fields = fields;
});

// Retrieve all fields
dozer.getFields().then((fieldsResponse) => {
  let fields = fieldsResponse.getFieldsList();
  let mapper = new RecordMapper(fieldsResponse.getFieldsList());
  let primaryIndexList = fieldsResponse.getPrimaryIndexList();
  let primaryIndexKeys = primaryIndexList.map((index) => fields[index].getName());

  // Track event streams (Insert, Update & Delete)
  let stream = dozer.onEvent();
  stream.on('data', (response) => {

    // Update event
    if (response.getTyp() === OperationType.UPDATE) {
      let oldValue = mapper.mapRecord(response?.getOld()?.getValuesList()!);
      let records = productState.records;
      let existingIndex = records.findIndex((v: { [x: string]: any }) => primaryIndexKeys.every((k) => v[k] === oldValue[k]));
      if (existingIndex > -1) {
        records[existingIndex] = mapper.mapRecord(response?.getNew()?.getValuesList()!);
        productState.records = records;
      }
    }

    // Insert event
    if (response.getTyp() === OperationType.INSERT) {
      let record = mapper.mapRecord(response?.getNew()?.getValuesList()!);
      productState.records = [record, ...productState.records];
    }

    // Delete event
    if (response.getTyp() === OperationType.DELETE) {
      let record = mapper.mapRecord(response?.getNew()?.getValuesList()!);
      let records = productState.records;
      let existingIndex = records.findIndex((v: { [x: string]: any }) => primaryIndexKeys.every((k) => v[k] === record[k]));
      if (existingIndex > -1) {
        records.splice(existingIndex, 1);
        productState.records = records;
      }
    }
  });
});

```

That's it. On client side just call a `cart_stats` and `order_stats`. Whenever user adds a item to cart & places an order you can able to see updated values on `cart_stats` endpoint. (Note: In order to make it as an realtime capablities just follow the same method like `⚡ Realtime data fetching`)

## 🔍 Filters & Queries

Dozer provides powerful and flexible ways to perform queries with dynamic filtering operations. While static SQL queries have limitations in terms of dynamic changes and additional filter operations, Dozer supports various filters that allow you to leverage PostgreSQL data operations and filter methods directly within the Dozer JS library.

The following filters are supported by Dozer:

1. OrderBy: Sort the query results in ascending or descending order based on specified criteria.
2. Limit: Restrict the number of responses returned by the query.
3. Skip: Skip a specified number of initial rows in the result set.
4. Filter: Apply advanced filtering conditions to customize query results.

Let's explore a few example scenarios to better understand the capabilities of Dozer's filters.

### 🔄 OrderBy

The "orderBy" filter allows you to sort the results in either ascending or descending order. Here's an example of how to use it with Dozer:

```TypeScript
// Initialize Dozer client
const dozer = new ApiClient('product');

// Perform the orderBy query
dozer.query({ orderBy: { name: Order.ASC } }) // You can specify either ASC or DESC
    .then(([fields, records]) => {
        // Update the product state with the sorted records
        productState.records = records;
        productState.fields = fields;
    });
```

In the above example, the query sorts the results in ascending order based on the "name" field. You can specify either "ASC" or "DESC" to determine the sorting order. The sorted records are then stored in the product state.

### 🔢 Limit

The "limit" query allows you to restrict the number of responses you receive from the Dozer client. Here's an example of how to use it with Dozer:

```TypeScript
// Initialize Dozer client
const dozer = new ApiClient('product');

// Perform the limit query
dozer.query({ limit: 10 })
    .then(([fields, records]) => {
        // Update the product state with the limited set of records
        productState.records = records;
        productState.fields = fields;
    });
```

In the above example, the query sets a limit of 10 responses, ensuring that only 10 records are retrieved.

### ⏭️ Skip

The "skip" query allows you to exclude a specified number of initial rows and retrieve the subsequent rows from the table. This feature is particularly useful when implementing pagination in your application.

Here's an example demonstrating how to use the skip functionality with Dozer:

```TypeScript
// Initialize Dozer client
const dozer = new ApiClient('product');

// Perform the skip query
dozer.query({ limit: 10, skip: 10 })
    .then(([fields, records]) => {
        // Update the product state with the retrieved records
        productState.records = records;
        productState.fields = fields;
    });
```

In the above example, the query skips the first 10 rows from the table and returns the subsequent 10 rows.

### 🔎 Filter

When using Dozer, you can apply filters to refine and customize your query results. Here's an example of how to use filters, along with explanations for some commonly used filter operators:

```TypeScript
// Define the filter based on the desired condition
const filter: DozerFilter = {
    // "name" is the column name in the "product" table
    name: {
        $eq: 'Shoes' // Get all products with the name "Shoes"
    },
    // LT: Less than
    price: {
        $lt: 50 // Get products with a price less than 50
    },
    // LTE: Less than or equal to
    quantity: {
        $lte: 10 // Get products with a quantity less than or equal to 10
    },
    // GT: Greater than
    rating: {
        $gt: 4.5 // Get products with a rating greater than 4.5
    },
    // GTE: Greater than or equal to
    discount: {
        $gte: 20 // Get products with a discount greater than or equal to 20
    },
    // CONTAINS: String contains
    description: {
        $contains: 'comfortable' // Get products with a description containing "comfortable"
    },
    // MATCHES_ANY: Array matches any
    categories: {
        $matches_any: ['Casual', 'Sports'] // Get products with categories matching either "Casual" or "Sports"
    },
    // MATCHES_ALL: Array matches all
    tags: {
        $matches_all: ['new', 'trendy'] // Get products with tags matching both "new" and "trendy"
    }
};

// Initialize Dozer client
const dozer = new ApiClient('product');

// Perform the query with the applied filter
dozer.query({ filter: filter })
    .then(([fields, records]) => {
        // Update the product state with the filtered records
        productState.records = records;
        productState.fields = fields;
    });
```

The above example demonstrates different filter operators:

- $lt (Less than)
- $lte (Less than or equal to)
- $eq (Equal to)
- $gt (Greater than)
- $gte (Greater than or equal to)
- $contains (String contains)
- $matches_any (Array matches any)
- $matches_all (Array matches all)

You can use these filter operators to customize your query and retrieve specific records based on the defined conditions.

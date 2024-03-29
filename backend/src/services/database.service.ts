import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
  products?: mongoDB.Collection;
  orders?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
  dotenv.config();

  const dbConnString = process.env.DB_CONN_STRING;
  const dbName = process.env.DB_NAME;
  const productsCollectionName = process.env.PRODUCTS_COLLECTION_NAME;
  const ordersCollectionName = process.env.ORDERS_COLLECTION_NAME;

  if (
    !dbConnString ||
    !dbName ||
    !productsCollectionName ||
    !ordersCollectionName
  ) {
    throw new Error("One or more environment variables are undefined.");
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConnString);

  await client.connect();

  const db: mongoDB.Db = client.db(dbName);

  const productsCollection: mongoDB.Collection = db.collection(
    productsCollectionName
  );
  const ordersCollection: mongoDB.Collection =
    db.collection(ordersCollectionName);

  collections.products = productsCollection;
  collections.orders = ordersCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collections: ${productsCollection.collectionName}, ${ordersCollection.collectionName}`
  );
}

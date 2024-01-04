// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables

export const collections: { products?: mongoDB.Collection } = {}

// Initialize Connection

export async function connectToDatabase() {
    dotenv.config();

    const dbConnString = process.env.DB_CONN_STRING;
    const dbName = process.env.DB_NAME;
    const productsCollectionName = process.env.PRODUCTS_COLLECTION_NAME;

    if (!dbConnString || !dbName || !productsCollectionName) {
        throw new Error("One or more environment variables are undefined.");
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConnString);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(dbName);
   
    const productsCollection: mongoDB.Collection = db.collection(productsCollectionName);

    collections.products = productsCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${productsCollection.collectionName}`);
}
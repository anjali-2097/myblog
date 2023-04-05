import { MongoClient } from 'mongodb';
let db;

async function connectToDB(cb) {
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ix9v4at.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    db = client.db('react-blog');
    cb();
}

export {db,connectToDB}
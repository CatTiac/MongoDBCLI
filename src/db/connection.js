require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const connection = async () => {
    try {
        await client.connect();
        //Below - Database(db)
        const db = client.db("Movies");
        //Below - Individual items inside db
        // const collection = db.collection("Film");
        //Below - returns items in Film list
        return db.collection("Film");

    } catch (error) {
        console.log(error)
    }
};
//Exporting name of function
module.exports = {client, connection};

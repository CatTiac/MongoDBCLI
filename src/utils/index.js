class Movie {
    constructor(title, actor = "Not specified") {
        this.title = title;
        this.actor = actor;
    }
    //In a method/class async goes before function
    //Passed collection as props from app.js
    async add (collection) {
        await collection.insertOne(this);
        return "Successfully added movie";
        //Above - adds this (one item) to database and returns success message if successful
    }

    async list(collection) {
        return await collection.find().toArray();
        //Above - Lists all movies in db. finds them and returns them as an array
    }

    async update(collection) {
        return await collection.updateMany();
    }

    async delete(collection) {
        return await collection.deleteMany();
    }
}

module.exports = Movie;
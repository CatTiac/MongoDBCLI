class Movie {
    constructor(title, actor = "Not specified", review = "No review", rating = "No rating") {
        this.title = title;
        this.actor = actor;
        this.review = review;
        this.rating = rating;
    }
    //In a method/class async goes before function
    //Passed collection as props from app.js
    async add(collection) {
        //Below - adds this (one item) to database and returns success message if successful
        await collection.insertOne(this);
        return `Successfully added the movie - ${this.title} with actor ${this.actor}`;
    }

    async list(collection) {
        //Below - Lists all movies in db. finds them and returns them as an array
        return await collection.find().toArray();
    }

    async update(collection) {
        // Below - filter to update all movies with title specifiedin terminal
        const filter = { title: `${this.title}` };
        //Below - Updates matching doc (with title specified in terminal) with a randomly generated % rating and review
        //$set - Sets the value of a field in a document
        const updateDoc = {
            $set: {
                rating: `This film has a rating of ${Math.floor(Math.random() * 100)}%`,
                review: `${this.review}`,
            },
        };
        const result = await collection.updateMany(filter, updateDoc);
        return (
            console.log(`Updated ${result.modifiedCount} movie(s) - ${filter.title}`));
    }

    async delete(collection) {
        //Below - deletes item based on title specified in terminal
        const filter = { title: `${this.title}` };
        const result = await collection.deleteMany(filter);
        return (
            console.log(`Deleted ${result.deletedCount} movie(s) - ${filter.title}`));
    }
    async search(collection) {
        //Below - Finds specific title of movie and returns object as an array
        return await collection.find(
            { title: `${this.title}` }
        ).toArray();
        //Below - query for specific title of movie
        // const query = { title: `${this.title }` };
        //Below - options show all value fields except the _id
        // const options = {
        //     projection: { _id: 0, title: 1, actor: 1, rating: 1, review: 1 },
        // };

    }
}


module.exports = Movie;
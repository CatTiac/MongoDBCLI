//Imports below
const yargs = require("yargs")
const { client, connection } = require("./db/connection")
const Movie = require("./utils");
//Below - Async because accessed outside
const app = async (yargsObj) => {
    //Below - Await because it does something outside the application
    const collection = await connection();
    try {
        if (yargsObj.add) {
            const movie = new Movie(yargsObj.title, yargsObj.actor);
            console.log(await movie.add(collection));
            //Above - take movie info, add it to mongodb database and console log a success message

        } else if (yargsObj.list) {
            const movie = new Movie(yargsObj.title, yargsObj.actor);
            console.log(await movie.list(collection))
            //Above - list all movies in database


        } else if (yargsObj.update) {
            //Below - filter to update all movies with title "Spiderman"
            const filter = { title: "Spiderman" };
            //Below - Updates matching doc (with title"Spiderman"(above)) with comment
            //$set - Sets the value of a field in a document
            const updateDoc = {
                $set: {
                    review: "Great film!",
                },
            };
            const result = await collection.updateMany(filter, updateDoc);
            console.log(`Updated ${result.modifiedCount} movie(s)`);

        } else if (yargsObj.delete) {
            //Below - deletes item based on title "Matilda"
            const filter = { title: "Matilda" };
            const result = await collection.deleteMany(filter);
            console.log("Deleted " + result.deletedCount + " movie(s)");

        } else {
            console.log("Incorrect command")
        }
        await client.close();
    } catch (error) {
        console.log(error);
    }
};

app(yargs.argv);
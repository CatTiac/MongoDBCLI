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
            const movie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.review, yargsObj.rating);
            console.log(await movie.add(collection));
            //Above - take movie info, add it to mongodb database and console log a success message

        } else if (yargsObj.list) {
            const movie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.review, yargsObj.rating);
            console.log(await movie.list(collection))
            //Above - list all movies in database


        } else if (yargsObj.update) {
            const movie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.review, yargsObj.rating);
            console.log(await movie.update(collection));
            

        } else if (yargsObj.delete) {
            const movie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.review, yargsObj.rating);
            console.log(await movie.delete(collection));
            //Below - deletes item based on title "Matilda"
            // const filter = { title: "Matilda" };
            // const result = await collection.deleteMany(filter);
            // console.log("Deleted " + result.deletedCount + " movie(s) - " + filter.title);


        } else {
            console.log("Incorrect command")
        }
        await client.close();
    } catch (error) {
        console.log(error);
    }
};

app(yargs.argv);
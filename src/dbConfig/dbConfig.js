
import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection

        connection.on("connected" , () => {
            console.log("mongo db connected");
        })
        connection.on("error" , () => {
            console.log("mongo db connection error pls make sure db is up and running" + err);
            process.exit()
        })

    }
    catch (error) {
        console.log("something went wrong in connecting to db");
        console.log(error);
    }

}

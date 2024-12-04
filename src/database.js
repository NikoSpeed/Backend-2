import mongoose from "mongoose";

mongoose.connect("mongodb+srv://CoderNiko:battle@cluster0.czuqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectados a la BD") )
    .catch( (error) => console.log("Tenemos un error FATAL: ", error))
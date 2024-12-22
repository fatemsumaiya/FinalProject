import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

//here we create our new https server to connect to our server
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Turtorial')
});




mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`); // Use backticks for string interpolation
        });
    })
    .catch((error) => {
        console.log(error);
    });
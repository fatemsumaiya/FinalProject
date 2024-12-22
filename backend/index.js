import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';


const app = express();

app.use(express.json());


//middleware for handling CORS POLICY
app.use(
    cors({
        origin: 'http://localhost:5555', //might have to fix this
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);


//here we create our new https server to connect to our server
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Turtorial')
});

app.use('/books', booksRoute);

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
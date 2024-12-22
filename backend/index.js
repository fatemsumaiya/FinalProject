import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js'

const app = express();

app.use(express.json());

//here we create our new https server to connect to our server
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Turtorial')
});

//route for saving a new book
app.post('/books', async(request, response) => {
    try{ 
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 
        ){}
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
    //our variable for new book
    const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
});

//our route to get All books from database
app.get('/books/:id', async(request, response) => {
    try{

        const{ id } = request.params;

       const book= await Book.findById(id); 


       return response.status(200).json({book});
    }catch(error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route to update a book
app.put('/books/:id', async (request, response) => {
    try {
      if( 
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear 
      ) {
        return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear'
        });
      }

      const{id} = request.params; 

      const result = await Book.findByIdAndUpdate(id, request.body);

      if(!result){
        return response.status(404).json({message: 'Book not found'});
      }

      return response.status(200).send({message: 'Book update successfully'});


    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    
    
    }
}


);

//Route to delete a book
app.delete('/books/:id', async (request, response) =>{
    try{
        const{id} = request.params;
        
        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book deleted successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
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
import express from 'express';
import mongoose from 'mongoose';
import process from 'node:process';
process.loadEnvFile();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    try {
        console.log('Connect to MongoDB');    
    } catch (error) {
        console.log(error);
    }   
})

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
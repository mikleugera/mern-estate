import express from 'express';
import mongoose from 'mongoose';
import process from 'node:process';
import UserRouter  from '../routes/user.route.js';
import AuthRouter  from '../routes/auth.route.js';

process.loadEnvFile();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    try {
        console.log('Connect to MongoDB');    
    } catch (error) {
        console.log(error);
    }   
})

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/', UserRouter)
app.use('/', AuthRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
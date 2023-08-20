import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

/* API routes */
app.use('/api/blog', blogRoutes);
app.use('/api/users', userRoutes);

/* Handle home route */
app.get('/', (req,res) => {
   res.status(200).json({"msg":"Api is running"});
})

app.use(notFound);
app.use(errorHandler);

connectDB()
.then(() => {
   app.listen(port, () => console.log(`listening on port ${port}`));
})
.catch((error) => {
   console.log(error);
})
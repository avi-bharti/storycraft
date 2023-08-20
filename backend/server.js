import path from 'path';
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
if(process.env.NODE_ENV === 'development'){
   app.get('/', (req,res) => {
      res.status(200).json({"msg":"Api is running"});
   })
}else{
   const __dirname = path.resolve();
   app.use(express.static(path.join(__dirname, '/frontend/build')))
   app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

app.use(notFound);
app.use(errorHandler);

connectDB()
.then(() => {
   app.listen(port, () => console.log(`listening on port ${port}`));
})
.catch((error) => {
   console.log(error);
})
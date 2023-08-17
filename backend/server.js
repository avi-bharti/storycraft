import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';

import blogRoutes from './routes/blogRoutes.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended:true}))

/* API routes */
app.use('/api/blog', blogRoutes);

/* Handle home route */
app.get('/', (req,res) => {
   res.status(200).json({"msg":"Api is running"});
})

connectDB()
.then(() => {
   app.listen(port, () => console.log(`listening on port ${port}`));
})
.catch((error) => {
   console.log(error);
})
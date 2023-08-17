import express from 'express';
const router = express.Router();

import { listBlogs, saveBlog } from '../controllers/blogController.js';

router.route('/').get(listBlogs).post(saveBlog);

export default router;
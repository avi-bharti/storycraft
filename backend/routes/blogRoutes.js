import express from 'express';
const router = express.Router();

import { protect } from '../middlewares/authMiddleware.js';
import { deletePost, getPostDetails, listBlogs, saveBlog, updateBlog } from '../controllers/blogController.js';

router.route('/').get(listBlogs).post(protect,saveBlog);
router.route('/:slug').get(getPostDetails);
router.route('/:id').put(protect,updateBlog).delete(protect,deletePost);

export default router;
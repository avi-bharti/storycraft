import express from 'express';
const router = express.Router();

import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
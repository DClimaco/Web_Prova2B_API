import express from 'express';
import UserController from "../controllers/UserController";

const router = express.Router();

// Rota para login
router.post('/login', UserController.loginUser);

export default router;

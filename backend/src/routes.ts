import express from 'express';
import { sendAppointmentEmail } from './controllers/emailController';

const router = express.Router();
router.post('/send-email', sendAppointmentEmail);

export default router;

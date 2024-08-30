import express from 'express';

import { sendSoS } from '../controllers/sos.controller.js';

const router = express.Router();


router.post('/sos',sendSoS);

export default router;


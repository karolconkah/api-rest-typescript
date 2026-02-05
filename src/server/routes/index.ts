import { Router } from 'express';
import { create } from '../controllers/cidades/create';

const router = Router();

console.log('DEBUG typeof create =', typeof create);

router.post('/cidades', create);

export { router };

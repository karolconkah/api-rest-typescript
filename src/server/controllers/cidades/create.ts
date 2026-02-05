import { Request, Response } from 'express';

interface ICidade {
  nome: string;
}

export function create(req: Request<{}, {}, ICidade>, res: Response) {
  console.log(req.body);
  return res.status(201).send('Create!');
}
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface IParamProps {
  id: string;
}

interface IBodyProps {
  nome?: string | null;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object({
      id: yup
        .string()
        .required()
        .matches(/^[1-9]\d*$/, 'Deve ser um número maior que 0'),
    })
  ),

  body: getSchema<IBodyProps>(
    yup.object({
      nome: yup.string().min(3).nullable().notRequired(),
    })
  ),
}));

export const updateById = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as IParamProps;
  const body = req.body as IBodyProps;

  console.log('PARAMS:', req.params);
  console.log('BODY:', body);

  const idNumber = Number(id);
  console.log('ID number:', idNumber);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Não implementado!');
};

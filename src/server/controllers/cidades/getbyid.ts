import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface IParamProps {
  id: string;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object({
      id: yup
        .string()
        .required()
        .matches(/^[1-9]\d*$/, 'Deve ser um número maior que 0'),
    })
  ),
}));

export const getById = async (req: Request, res: Response) => {
  // se quiser, você pode “ler como” IParamProps só aqui:
  const { id } = req.params as unknown as IParamProps;
;

  console.log(req.params);

  const idNumber = Number(id);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Não implementado!');
};

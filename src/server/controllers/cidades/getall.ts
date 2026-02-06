import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface IQueryProps {
  page?: number | null;
  limit?: number | null;
  filter?: string | null;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object({
      page: yup
        .number()
        .nullable()
        .transform((value: number, originalValue: unknown) => {
          if (originalValue === '' || originalValue === undefined || originalValue === null) {
            return undefined;
          }
          return Number.isNaN(value) ? undefined : value;
        })
        .notRequired()
        .moreThan(0),

      limit: yup
        .number()
        .nullable()
        .transform((value: number, originalValue: unknown) => {
          if (originalValue === '' || originalValue === undefined || originalValue === null) {
            return undefined;
          }
          return Number.isNaN(value) ? undefined : value;
        })
        .notRequired()
        .moreThan(0),

      filter: yup.string().nullable().notRequired(),
    })
  ),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: 'Caxias do Sul',
    }
  ]);};
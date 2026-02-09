import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { getAll as getAllPessoas } from "../../database/providers/pessoas/getall";
import { count as countPessoas } from "../../database/providers/pessoas/count";
import { validation } from '../../shared/middlewares';


interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object({
      page: yup
        .number()
        .integer()
        .moreThan(0)
        .optional()
        .transform((v) => (isNaN(v) ? undefined : v)),
      limit: yup
        .number()
        .integer()
        .moreThan(0)
        .optional()
        .transform((v) => (isNaN(v) ? undefined : v)),
      filter: yup.string().optional(),
    }) as yup.ObjectSchema<IQueryProps>
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 7;
  const filter = req.query.filter ?? '';

  const result = await getAllPessoas(page, limit, filter);
  const count = await countPessoas(filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};
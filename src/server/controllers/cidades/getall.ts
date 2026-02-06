import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { getAll as getAllCidades } from "../../database/providers/cidades/getall";
import { count as countCidades } from "../../database/providers/cidades/count";

type TMaybe<T> = T | null | undefined;

interface IQueryProps {
  id?: TMaybe<number>;
  page?: TMaybe<number>;
  limit?: TMaybe<number>;
  filter?: TMaybe<string>;
}

const numberOptional = yup
  .number()
  .transform((value, originalValue) => {
    // query vem como string; trata vazio/null como "não veio"
    if (originalValue === "" || originalValue === undefined || originalValue === null) {
      return undefined;
    }
    return Number.isNaN(value) ? undefined : value;
  })
  .nullable()
  .notRequired()
  .moreThan(0);

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: numberOptional,
      limit: numberOptional,
      id: numberOptional.integer(),
      filter: yup.string().nullable().notRequired(),
    })
  ),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
   const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 7;
  const filter = req.query.filter ?? "";
  const id = req.query.id ?? 0;

  const result = await getAllCidades(page, limit, filter, Number(id));
  const count = await countCidades(filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};
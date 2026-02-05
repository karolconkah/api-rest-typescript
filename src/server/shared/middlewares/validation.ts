import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type TProperty = 'body' | 'headers' | 'params' | 'query';

// ✅ Agora o Yup aceita: T precisa ser um objeto (ou null/undefined se o yup permitir)
type TGetSchema = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>
) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<Maybe<AnyObject>>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        const property = key as TProperty;

        schema.validateSync(req[property], { abortEarly: false });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (!error.path) return;
          errors[error.path] = error.message;
        });

        errorsResult[key] = errors;
      }
    });

    if (Object.keys(errorsResult).length === 0) {
      return next();
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  };

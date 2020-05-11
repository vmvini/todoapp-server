import { validationResult } from 'express-validator';
import * as httpStatus from 'http-status';

export const requestError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors).end();
  }
  return next();
}

// handle not found errors
export const notFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  res.json({
    success: false,
    message: 'Requested Resource Not Found'
  });
  res.end();
};

// handle internal server errors
export const internalServerError = (err, req, res, next) => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    message: err.message,
    extra: err.extra,
    errors: err
  });
  res.end();
};

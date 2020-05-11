import { check } from "express-validator";
import { requestError } from "../../helpers/errorHandler";

export const createProjectValidators = [
  check('name', 'project name is missing').exists(),
  requestError,
];

export const deleteProjectValidators = [

];

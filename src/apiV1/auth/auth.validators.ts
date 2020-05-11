import { check } from "express-validator";
import { requestError } from "../../helpers/errorHandler";

const passwordRegex = /(?=.{9,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/;
const passwordMsg =
  "Password must have 9 characters, one special, at least one letter lowercase and uppercase, and at least one number";
const passwordMatchMsg = "Confirm password does not match password";
const missingPassword = "Missing password";
const missingEmail = "Missing email";
const invalidEmail = "Invalid email";
const missingConfirmPassword = "Missing password confirmation";
const missingName = "Missing name";

export const registerUserValidation = [
  check("email", missingEmail).exists(),
  check("email", invalidEmail).isEmail(),
  check("password", missingPassword).exists(),
  check("password", passwordMsg).matches(passwordRegex),
  check("confirmPassword", passwordMatchMsg).custom(
    (value, { req: { confirmPassword, password } }) => {
      return password === confirmPassword;
    }
  ),
  check("confirmPassword", missingConfirmPassword),
  check("name", missingName).exists(),
  requestError

];

export const loginValidation = [
  check("email", missingEmail).exists(),
  check("email", invalidEmail).isEmail(),
  check("password", missingPassword).exists(),
  requestError
];

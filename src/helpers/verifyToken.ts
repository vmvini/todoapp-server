import * as jwt from 'jwt-then';
import config from '../config/config';

export const getToken = (req) => {
  return req.headers.authorization.split(' ')[1];
};

export const verifyToken = async (req, res, next): Promise<any> => {
  const token: string = getToken(req);

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  try {
    // verifies secret and checks exp
    const decoded = await jwt.verify(token, config.JWT_ENCRYPTION);
    req.email = decoded.email;
    next();
  } catch (err) {
    res.status(403).send({ auth: false, message: err });
  }
};

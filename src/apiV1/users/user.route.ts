import { Router } from 'express';
import Controller from './user.controller';
import { verifyToken } from '../../helpers/verifyToken';

const user: Router = Router();
const controller = new Controller();

user.get('/:id', verifyToken, controller.findOne);

user.put('/:id', controller.update);

export default user;

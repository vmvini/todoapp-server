import { Router } from 'express';
import auth from './auth/auth.route';
import projects from './projects/project.route';
import users from './users/user.route';

const router: Router = Router();

router.use('/', auth);
router.use('/users', users);
router.use('/projects', projects);

export default router;

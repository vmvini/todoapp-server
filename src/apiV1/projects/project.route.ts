import { Router } from "express";
import { verifyToken } from "../../helpers/verifyToken";
import tasks from "../tasks/tasks.route";
import Controller from "./project.controller";
import { findProject } from "./project.middlewares";
import { createProjectValidators, deleteProjectValidators } from "./project.validators";

const projects: Router = Router();
const controller = new Controller();


projects.post('', verifyToken, createProjectValidators, controller.create);

projects.delete('/:projectId', verifyToken, deleteProjectValidators, controller.delete );

projects.put('', verifyToken, createProjectValidators, controller.update);

projects.get('', verifyToken, controller.findAll);

projects.use('/:projectId/tasks', verifyToken, findProject, tasks);

export default projects;

import { Router } from "express";
import Controller from "./tasks.controller";

const tasks: Router = Router();
const controller = new Controller();

tasks.post('', controller.create);

tasks.put('', controller.update);

tasks.delete('/:taskId', controller.delete);

export default tasks;

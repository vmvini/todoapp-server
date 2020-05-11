import { Response } from "express";
import User from "../users/user.model";

export default class ProjectController {

  public findAll = async (req, res: Response): Promise<any> => {
    try {
      const user = await User.findOne({ email: req.email });
      return res.status(200).send({
        success: true,
        message: "results found",
        data: user.projects,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };

  public create = async (req, res: Response): Promise<any> => {
    try {
      const user = await User.findOne({ email: req.email });
      const { name, tasks } = req.body;
      user.projects.push({ name, tasks });
      const newUser = await user.save();
      return res.status(201).send({
        success: true,
        message: "Project Successfully created",
        data: newUser.projects.pop(),
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };

  public delete = async (req, res): Promise<any> => {
    try {
      const user = await User.findOne({ email: req.email });
      const { projectId } = req.params;
      user.projects.pull({ _id: projectId });
      const newUser = await user.save();
      return res.status(200).send({
        success: true,
        message: "Project removed",
        data: newUser,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };

  public update = async (req, res): Promise<any> => {
    try {
      const user = await User.findOne({ email: req.email });
      const { _id, name, tasks } = req.body;
      const item = user.projects.filter(p => p._id.toString() === _id).reduce((p, c) =>  c, null);
      const index = user.projects.indexOf(item);
      user.projects.set(index, { _id, name, tasks });
      const newUser = await user.save();
      return res.status(200).send({
        success: true,
        message: "Project updated",
        data: newUser.projects[index],
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };
}

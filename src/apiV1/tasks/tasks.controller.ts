import User from "../users/user.model";

export default class TasksController {
  public create = async (req, res): Promise<any> => {
    try {
      const { project } = req;
      const { description, period, finished } = req.body;
      project.tasks.push({ description, period, finished });
      const newUser = await req.user.save();
      return res.status(201).send({
        success: true,
        message: "Task Successfully created",
        data: project.tasks.pop(),
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
      const { project } = req;
      const { _id, description, period, finished } = req.body;
      const item = project.tasks.filter(t => t._id.toString() === _id).reduce((p, c) =>  c, null);
      const index = project.tasks.indexOf(item);
      project.tasks.set(index, { _id, description, period, finished });
      const newUser = await req.user.save();
      return res.status(200).send({
        success: true,
        message: "Task updated",
        data: newUser,
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
      const { user } = req;
      const { project } = req;
      const { taskId } = req.params;
      project.tasks.pull({ _id: taskId });
      const newUser = await user.save();
      return res.status(200).send({
        success: true,
        message: "Task removed",
        data: newUser,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };
}

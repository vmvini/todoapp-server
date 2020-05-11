import User from "../users/user.model";

export const findProject = async (req, res, next): Promise<any> => {
  try {
    const user = await User.findOne({ email: req.email });
    const { projectId } = req.params;
    req.project = user.projects.filter((p) => p._id.toString() === projectId).reduce((p, c) => c, null);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
};

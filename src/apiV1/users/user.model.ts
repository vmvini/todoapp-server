import * as mongoose from 'mongoose';
import { Project } from '../projects/project.model';
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    projects: [Project]
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

export default mongoose.model('User', UserSchema);

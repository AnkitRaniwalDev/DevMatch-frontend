import mongoose, { Schema, model, models } from 'mongoose';

//  (Interface)
interface IUser {
  name: string;
  email: string;
  image?: string;
  skills: string[];
  learning: string[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  skills: { type: [String], default: [] },
  learning: { type: [String], default: [] },
}, { timestamps: true });

// अगर मॉडल पहले से बना है तो उसे यूज़ करो, नहीं तो नया बनाओ
const User = models.User || model<IUser>('User', UserSchema);

export default User;
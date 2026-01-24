import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Contact || model('Contact', ContactSchema);
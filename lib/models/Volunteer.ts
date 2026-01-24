import { Schema, model, models } from 'mongoose';

const VolunteerSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true },
        interests: [{ type: String }], // Array of strings for multiple interests
        motivation: { type: String },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'accepted', 'rejected'],
            default: 'pending'
        },
    },
    { timestamps: true }
);

export default models.Volunteer || model('Volunteer', VolunteerSchema);
import { Schema, model, models } from 'mongoose';

const TeamSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    socials: {
        linkedin: String,
        twitter: String
    },
    order: { type: Number, default: 0 }
}, {
    timestamps: true,
    collection: 'team'
});

export default models.team || model('team', TeamSchema);
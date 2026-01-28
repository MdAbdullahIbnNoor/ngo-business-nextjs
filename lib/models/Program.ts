import { Schema, model, models } from 'mongoose';

const ProgramSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        longDescription: { type: String, required: true },
        status: { type: String, required: true },
        impact: { type: String },
        beneficiaries: { type: String },
        fundingGoal: { type: String },
        raised: { type: String },
        location: { type: String },
        startDate: { type: String },
        duration: { type: String },
        goals: [{ type: String }],
        highlights: [{ type: String }],
        testimonial: {
            quote: { type: String },
            author: { type: String }
        }
    },
    {
        timestamps: true
    }
);

export default models.Program || model('Program', ProgramSchema);

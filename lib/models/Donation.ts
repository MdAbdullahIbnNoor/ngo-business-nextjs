import { Schema, model, models } from 'mongoose';

const DonationSchema = new Schema(
    {
        donorName: { type: String, required: true },
        email: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        frequency: { type: String, enum: ['once', 'monthly'], default: 'once' },
        project: { type: String, default: 'General Fund' },
        status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
        transactionId: { type: String },
    },
    { timestamps: true }
);

export default models.Donation || model('Donation', DonationSchema);
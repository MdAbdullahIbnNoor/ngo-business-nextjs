import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true }, // Required for card previews
    content: { type: String, required: true },

    // 1. Classification
    category: {
      type: String,
      required: true,
      enum: ['Impact Story', 'News', 'Health', 'Education', 'Sustainability'],
      default: 'News'
    },
    tags: [{ type: String }],

    // 2. Media
    coverImage: { type: String, required: true }, // URL to Cloudinary/S3
    ogImage: { type: String }, // Optimized image for Facebook/Twitter (1200x630)

    // 3. Author Information
    author: {
      name: { type: String, default: 'Hope Foundation Team' },
      role: { type: String, default: 'Field Correspondent' },
      image: { type: String } // Profile picture URL
    },

    // 4. Publishing Control
    published: { type: Boolean, default: false }, // Change to false by default for safety
    publishedAt: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false }, // To show at the top of the blog page

    // 5. SEO & Metadata
    metaTitle: { type: String },
    metaDescription: { type: String },
    readingTime: { type: Number }, // Estimated minutes to read

    // 6. Engagement (Optional)
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt
  }
);

export default models.Post || model('Post', PostSchema);
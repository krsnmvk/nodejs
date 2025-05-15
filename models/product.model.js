import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    description: {
      required: true,
      type: String,
    },
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const ProductModel = model('Product', productSchema);

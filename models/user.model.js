import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    cart: {
      items: [
        {
          productId: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'product',
          },
          quantity: {
            required: true,
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export const UserModel = model('user', userSchema);

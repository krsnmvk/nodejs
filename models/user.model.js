import { model, Schema } from 'mongoose';

const userSchema = new Schema({
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
          required: Schema.Types.ObjectId,
          type: Object,
        },
        quantity: {
          required: true,
          type: Number,
        },
      },
    ],
  },
});

export const UserModel = model('user', userSchema);

import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
      items: [
        {
          productId: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Product',
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

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.deleteFromCart = function (id) {
  const updateCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== id;
  });

  this.cart.items = updateCartItems;

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };

  return this.save();
};

export const UserModel = model('User', userSchema);

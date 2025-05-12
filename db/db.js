import mongoose from 'mongoose';
import { UserModel } from '../models/user.model.js';

export function dbConnection() {
  mongoose
    .connect(
      'mongodb+srv://typescript97:typescript97@cluster0.wbe8zlc.mongodb.net/nodejs?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => console.log('Connected to MongoDB'))
    .then(() => {
      UserModel.findOne().then((user) => {
        if (!user) {
          new UserModel({
            name: 'test',
            email: 'test@test.com',
            items: [],
          }).save();
        }
      });
    })
    .catch(() => console.log('Error connecting to MongoDB '));
}

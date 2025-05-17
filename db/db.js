import mongoose from 'mongoose';

export function dbConnection() {
  mongoose
    .connect(
      'mongodb+srv://typescript97:typescript97@cluster0.wbe8zlc.mongodb.net/nodejs?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Error connecting to MongoDB '));
}

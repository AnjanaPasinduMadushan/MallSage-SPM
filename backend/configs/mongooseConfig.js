import { mongoose } from 'mongoose';

const db = async () => {
  try {
    mongoose.connect(process.env.link, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { connection } = mongoose;
    connection.once('open', () => {
      console.log('MongoDB Connection Success!');
    });
  } catch (err) {
    console.log('Database connection error:', err);
  }
};

export default db;
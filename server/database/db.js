import mongoose from "mongoose";

export const connection = async (username, password) => {
  const URL = 'mongodb+srv://sumon:U22xiAl8qv58BDSB@cluster0.1eayp2a.mongodb.net/';
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.log(`something wrong in database server`);
    console.log("error", error);
  }
};

export default connection;

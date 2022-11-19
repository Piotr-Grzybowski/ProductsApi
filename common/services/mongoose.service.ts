import mongoose from "mongoose";
import debug from "debug";
import dotenv from "dotenv";
dotenv.config();

const log: debug.IDebugger = debug("app:mongoose-service");

class MongooseService {
  constructor() {
    const uri =
      process.env.NODE_ENV === "testing"
        ? process.env.MONGODB_URL_TEST
        : process.env.MONGODB_URL_DEV;
    this.connectWithDB(uri);
  }

  getMongoose() {
    return mongoose;
  }

  connectWithDB(uri: any) {
    log("Attempting to connect mongo db");
    mongoose
      .connect(uri)
      .then(() => {
        log("MongoDB is connected");
      })
      .catch((err) => {
        log("MongoDB couldn't connect. Some errors occurs");
      });
  }
}

export default new MongooseService();

import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:mongoose-service");

class MongooseService {
  constructor() {
    this.connect();
  }

  getMongoose() {
    return mongoose;
  }

  connect() {
    log("Attempting to connect mongo db");
    mongoose
      .connect(`mongodb://localhost:27017/productsApi`)
      .then(() => {
        log("MongoDB is connected");
      })
      .catch((err) => {
        log("MongoDB couldn't connect. Some errors occurs");
      });
  }
}

export default new MongooseService();

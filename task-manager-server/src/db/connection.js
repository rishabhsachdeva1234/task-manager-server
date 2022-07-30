import mongoose from "mongoose";
export function dbConnectionInit(connectionURL) {
  mongoose.Promise = global.Promise;
  return mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

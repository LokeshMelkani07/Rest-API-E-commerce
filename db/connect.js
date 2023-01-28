const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Password: Lokesh1234@.
// Password URL Encoded: Lokesh1234%40%2E

const connectDB = (uri) => {
  console.log("Connected to mongoose database");
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;

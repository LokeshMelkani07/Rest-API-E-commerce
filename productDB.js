require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const productJson = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(productJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();

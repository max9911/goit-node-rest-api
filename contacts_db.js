import mongoose from "mongoose";

const DB01_URI = process.env.DB01_URI;

mongoose
  .connect(DB01_URI)
  .then(() => {
    console.log("Database connection successful to DB01");
  })
  .catch((err) => {
    console.error("Error while conecting to DB01", err);
    process.exit(1);
  });

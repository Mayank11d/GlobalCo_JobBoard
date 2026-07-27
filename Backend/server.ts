import mongoose from "mongoose";
import app from "./app";
import { env } from "./src/config/env.config";
import connectDB from "./src/config/db.config";

let server: any;

connectDB().then(() => {
  server = app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});

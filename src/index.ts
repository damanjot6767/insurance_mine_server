
require('dotenv').config()
import connectDB from "./db/index";
import { app } from "./app";
import { liveCoinWatchIntervals, stopLiveCoinWatchIntervals } from "./utils/intervals/live-coin-watch-interval";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is runing at port ${process.env.PORT}`);
    });

    // liveCoinWatchIntervals
    liveCoinWatchIntervals()
  })
  .catch((err) => {
    console.log("MONGODB connection error", err);
  });

  // Gracefully shutdown the server and clear the interval
const gracefulShutdown = () => {
  console.log("Shutting down server...");
  stopLiveCoinWatchIntervals();
  process.exit();
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
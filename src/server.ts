import app from "./app";
import { initDB } from "./db";

const main = () => {
  app.listen(8000, () => {
    initDB()
    console.log("server is running");
  });
};

main();

import app from "./src/app";
import dbConnect from "./src/db/dbConnection";
const port = process.env.PORT

dbConnect()
  .then(() => {
    Bun.serve({
      fetch: app.fetch,
      port: port,
    });
    console.log(`server started on port: ${port}`);
  })
  .catch((error) => {
    console.error("unable to start server", error);
  });
// Bun.serve({
//   fetch: app.fetch,
// });

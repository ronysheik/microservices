import express from "express";
import router from "./routes/dataRoutes"

const app = express();

// binding middleware
app.use('/v1', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
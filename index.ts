import express, { Request, Response } from "express";
import productRoutes from "./Routes/product_routes";
import userRoutes from "./Routes/User_routes";
import reportRoutes from "./Routes/report_routes";
import cors from "cors";


const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://hq.kpop.com.np/"],
  })
);

app.use(express.json());

app
  .get("/", (req: Request, res: Response) => {
    res.send("All good");
  })
  .listen(3000, () => {
    console.log(`http://localhost:3001`);
  });

app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/reports", reportRoutes);

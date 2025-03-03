import express from "express";
import "dotenv/config";
import { ConnectToMongoDB } from "./services/database.js";
import urlRouter from "./routes/url.routes.js";
import AuthRouter from "./routes/Auth.router.js";
import Url from "./models/url.model.js";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

// Database Connection
await ConnectToMongoDB().catch((err) => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello from server"));
// URL ROUTES
app.use("/api/v1/url", urlRouter);

// User Login/Signup, Auth Routing
app.use("/auth", AuthRouter);

// Redirect URL
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );
    if (!entry) {
      return res.status(404).json({
        error: "Short URL not found",
      });
    }
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error while redirecting:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:` + PORT);
});

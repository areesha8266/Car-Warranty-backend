const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { AppDataSource } = require("./data-source");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const claimRoutes = require("./routes/claim.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173",
  ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(",").map((o) => o.trim()) : []),
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (/^https:\/\/[\w-]+--[\w-]+\.netlify\.app$/.test(origin)) return callback(null, true);
      if (/^https:\/\/[\w-]+\.netlify\.app$/.test(origin)) return callback(null, true);
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => {
  res.send("Luxury Warranty API is running.");
});

app.get("/api/test-database", async (req, res) => {
  try {
    const status = AppDataSource.isInitialized;
    if (status) {
      const result = await AppDataSource.query("SELECT current_database(), current_user, version();");
      res.json({
        message: "Connected to PostgreSQL!",
        status: "Online",
        details: result[0]
      });
    } else {
      res.status(500).json({ message: "Database not initialized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Database connection failed", error });
  }
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database initialized");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));

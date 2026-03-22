const express = require("express");
const cors = require("cors");
const processRoutes = require("./routes/processRoutes");
const multer = require("multer");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: "https://smart-scribe-iota.vercel.app",
  }
));
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.use("/api", upload.single("file"), processRoutes);

app.get("/", (req, res) => {
  res.send("smartscribe backend running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Try a different port or kill the process.`);
    } else {
        console.error("Server error:", err);
    }
});
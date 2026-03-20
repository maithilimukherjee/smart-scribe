const express = require("express");
const cors = require("cors");
const processRoutes = require("./routes/processRoutes");
const multer = require("multer");


const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.use("/api", upload.single("file"), processRoutes);

app.get("/", (req, res) => {
  res.send("smartscribe backend running");
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
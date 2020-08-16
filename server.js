const express = require("express");
const connectDb = require("./config/connection");

const app = express();

// Initialise our database collection
connectDb();

// Initialise Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API running");
});

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

// things to google
// how to get connection string for my local database for development
// how to use env cmd

// / "mongoURI": "mongodb+srv://kolniy:kolniy1234@developershangout-kv8uf.mongodb.net/test?retryWrites=true&w=majority",

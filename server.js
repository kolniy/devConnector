const express = require("express");
const connectDb = require("./config/connection");
const path = require("path")

const app = express();

// Initialise our database collection
connectDb();

// Initialise Middleware
app.use(express.json({ extended: false }));


// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/posts"));


if(process.env.NODE_ENV === 'production'){
    // set static files
    app.use(express.static('client/build'))

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));


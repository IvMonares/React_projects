const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Create server
const app = express();

// Connect to DB
connectDB();

//Enable Cors
const corsOptions = {
    origin: process.env.FRONTEND_URL,
};
app.use(cors(corsOptions));

// App port
const port = process.env.PORT || 4000;

// Enable body parser
app.use(express.json());

// Enable public foler

app.use(express.static("uploads"));

// App Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/links", require("./routes/links"));
app.use("/api/files", require("./routes/files"));

// Start app
app.listen(port, "0.0.0.0", () => {
    console.log("Server is active in port: " + port);
});

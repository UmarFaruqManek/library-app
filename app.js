require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

const bookRoutes = require("./routes/books");
const memberRoutes = require("./routes/members");
const loanRoutes = require("./routes/loans");
const dashboardController = require("./controllers/dashboardController");

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session & Flash
app.use(session({
  secret: "library_secret",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Global messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.get("/", dashboardController.index);
app.use("/books", bookRoutes);
app.use("/members", memberRoutes);
app.use("/loans", loanRoutes);

// Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import expressEjsLayouts from "express-ejs-layouts";
import router from "./routes/index.js";
import flash from "connect-flash";
import { setFlash } from "./config/middlewares.js";
import "./config/mongoose.js";
import passport from "./config/passport_local_strategy.js";

const app = express();
const port = 5000;

// Url Encoded middleware for parsing post requests
app.use(express.urlencoded({ extended: false }));

// view engine setup, views and statics
app.set("view engine", "ejs");
// app.set("views", path.join(process.cwd(), "views"));
app.set("views", "views");
app.use(expressEjsLayouts);

// Extract style and scripts from sub pages into the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("assests"));

// Using Express Session to store user session details
app.use(
  session({
    secret: "secretkeykeepitsafe",
    name: "csvupload",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1/csv_upload_db",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
// Using password session middleware to get user and place it in req object
app.use(passport.session());
// Middleware to set authenticated user to response object
app.use(passport.setAuthenticatedUser);

// Middleware for flash messages
app.use(flash());
app.use(setFlash);

app.use("/", router);

app.listen(port, () => {
  console.log("Server started on port : ", port);
});

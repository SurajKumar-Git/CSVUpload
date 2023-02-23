import passport from "passport";
import passportLocal from "passport-local";
import User from "../models/user.js";

// Passpost local strategy
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function verify(req, email, password, done) {
      try {
        const user = await User.findOne({ email });
        if (!user || user.password != password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.log("Error : ", error);
        return done(error);
      }
    }
  )
);

// Serializing user is in session cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing user id and getting user
passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  return done(null, user);
});

// Additional Middlewares
// check if the user is authenticated - middleware
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/user/login");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

// Prevent authenticated user from access login / sign up page again.
passport.checkNotAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
};

export default passport;

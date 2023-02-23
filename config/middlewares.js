export function setFlash(req, res, next) {
  // Middleware to set flash messages
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
    info: req.flash("info"),
    warning: req.flash("warning"),
  };
  next();
}

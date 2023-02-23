import User from "../models/user.js";

export function login(req, res) {
  res.render("login");
}

export function createSession(req, res) {
  req.flash("success", ["Logged in Successfully", "Welcome Back"]);
  res.redirect("/");
}

export function logout(req, res) {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
}

export function signUp(req, res) {
  res.render("signup");
}

export async function createUser(req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // Checking if user with email already exists
    if (await User.findOne({ email })) {
      req.flash("info", `User already exists with ${email}`);
      return res.redirect("back");
    }

    if (password != confirmpassword) {
      req.flash("error", `Password do not match`);
      return res.redirect("back");
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    req.login(user, function (err) {
      if (err) {
        return res.redirect("/user/login");
      }
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/user/signup");
  }
}

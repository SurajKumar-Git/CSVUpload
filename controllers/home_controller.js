import CSV from "../models/csv.js";

export async function home(req, res) {
  // Getting all uploaded csv files of user and returning in sorted order of uploaded date
  const userUploadedCSVFiles = await CSV.find({ user: req.user }).sort({
    createdAt: -1,
  });
  res.render("home", { files: userUploadedCSVFiles });
}

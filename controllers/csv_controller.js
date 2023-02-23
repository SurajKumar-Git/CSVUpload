import CSV from "../models/csv.js";
import path from "path";
import fs from "fs";
import { getCSVRecords } from "../config/csv_parser.js";

export async function uploadCSVFiles(req, res) {
  for (const file of req.files) {
    await CSV.create({
      user: req.user,
      file: file.filename,
      originalName: file.originalname,
    });
  }
  req.flash("success", "Files uploaded successfully");
  res.redirect("/");
}

export async function openCSVFile(req, res) {
  try {
    const id = req.params.id;
    const csvFileDocument = await CSV.findOne({ _id: id, user: req.user });
    if (!csvFileDocument) {
      // current user and csv uploaded user are different or incorrect ID
      req.flash("error", "Cannot Open: Access Denied / File not found");
      return res.redirect("/");
    }

    const csvFilePath = path.join(
      process.cwd(),
      "/uploads/csv_files",
      csvFileDocument.file
    );

    const records = await getCSVRecords(csvFilePath);

    res.render("csv_view", { records, filename: csvFileDocument.originalName });
  } catch (error) {
    console.log(error);
    req.flash(
      "error",
      "Something went wrong: Please check file if has comma seperated values"
    );
    res.redirect("/");
  }
}

export async function deleteCSVFile(req, res) {
  const id = req.params.id;
  const csvFile = await CSV.findOneAndDelete({ _id: id, user: req.user });
  if (!csvFile) {
    //current user and csv uploaded user are different or incorrect ID
    req.flash("error", "Cannot Delete: Access Denied / File not found");
    return res.redirect("/");
  }

  const filePath = path.join(process.cwd(), "/uploads/csv_files", csvFile.file);

  // Delete if exists
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  req.flash("success", "Deleted");
  res.redirect("/");
}

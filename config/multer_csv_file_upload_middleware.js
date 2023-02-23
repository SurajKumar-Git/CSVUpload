import multer from "multer";
import path from "path";

const CSVFileUploadsPath = "/uploads/csv_files";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, path.join(process.cwd(), CSVFileUploadsPath));
  },
  filename: function (req, file, done) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    done(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const csvUploads = multer({
  storage: storage,
  fileFilter: function (req, file, done) {
    const fileExtenstion = path.extname(file.originalname);
    // Allow only csv files
    if (fileExtenstion != ".csv") {
      req.flash(
        "error",
        "only CSV files are allowed. File : " +
          file.originalname +
          " was not uploaded"
      );
      return done(null, false);
    }
    done(null, file);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).array(["csvfiles"]);

export default csvUploads;

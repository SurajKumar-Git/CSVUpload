import { parse } from "csv-parse";
import fs from "fs";

export function getCSVRecords(filePath) {
  // Using CSV Parser to parse the CSV file
  return new Promise((resolve, reject) => {
    const records = [];
    const parser = parse({ trim: true });

    // Reading file using node Stream API and piping output to CSV parser
    fs.createReadStream(filePath)
      .on("error", (err) => {
        reject(err);
      })
      .pipe(parser);

    // Using readable stream api of CSV parser to consume records
    parser.on("readable", () => {
      let row;
      do {
        row = parser.read();
        if (row != null) {
          records.push(row);
        }
      } while (row);
    });

    // rejecting promise in case unable to parse CSV file.
    parser.on("error", function (err) {
      reject(err);
    });

    // Returing records.
    parser.on("end", () => {
      resolve(records);
    });
  });
}

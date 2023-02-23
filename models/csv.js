import { Schema, model } from "mongoose";

const CSVSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CSV = model("CSV", CSVSchema);
export default CSV;

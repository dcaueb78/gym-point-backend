import mongoose from "mongoose";
import { isBefore, subDays } from "date-fns";

const Checkin = new mongoose.Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
    this_week: {
      type: Boolean,
      get() {
        return isBefore(new Date(), subDays(this.date, 7));
      },
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

export default mongoose.model("Checkin", Checkin);

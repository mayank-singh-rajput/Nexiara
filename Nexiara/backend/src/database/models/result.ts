import mongoose, { Document, Schema, Model } from "mongoose";

interface IResult extends Document {
  userId: mongoose.Types.ObjectId;
  total: number;
  overallResult: {
    QuestionId: mongoose.Types.ObjectId;
    ChoosedOption: string;
    point: number;
  }[];
  categorialScore: {
    category: string,
    point: number,
  }[];
}

const resultSchema: Schema<IResult> = new Schema<IResult>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    total: {
      type: Number,
      default: 0,
    },
    overallResult: [
      {
        QuestionId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Question",
        },
        ChoosedOption: {
          type: String,
        },
        point: {
          type: Number,
        },
      },
    ],
    categorialScore: [
      {
        category: {
          type: String,
        },
        point: {
          type: Number
        }
      }
    ]
  },
  { timestamps: true }
);

const Result: Model<IResult> = mongoose.model<IResult>("Result", resultSchema);

export default Result;

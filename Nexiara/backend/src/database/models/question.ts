import mongoose, { Document, Schema, Model } from "mongoose";

interface IQuestion extends Document {
  Question: string;
  category: string;
  option1: {
    value: string;
    point: number;
  };
  option2: {
    value: string;
    point: number;
  };
  option3: {
    value: string;
    point: number;
  };
  option4: {
    value: string;
    point: number;
  };
}

const questionSchema: Schema<IQuestion> = new Schema<IQuestion>(
  {
    Question: {
      type: String,
    },
    category: {
      type: String,
    },
    option1: {
      value: {
        type: String,
      },
      point: {
        type: Number,
      },
    },
    option2: {
      value: {
        type: String,
      },
      point: {
        type: Number,
      },
    },
    option3: {
      value: {
        type: String,
      },
      point: {
        type: Number,
      },
    },
    option4: {
      value: {
        type: String,
      },
      point: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

const Question: Model<IQuestion> = mongoose.model<IQuestion>(
  "Question",
  questionSchema
);

export default Question;

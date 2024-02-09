// QuestionCard.js
import React from "react";

const QuestionCard = ({ question, setSelected }) => {
  const handleOptionSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="text-[#fff] box-border border-4 container p-4 mx-auto" key={question._id}>
      <h1 className="text-2xl font-bold">{question.Question}</h1>

      <div className="text-xl font-medium">
        <ul className="grid gap-y-4 p-5">
          <label>
            <li className={`p-2 border rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500 flex items-center justify-start ${question.ChoosedOption === question.option1.value ? 'bg-lime-500' : 'bg-[#121418]'}`}>
              <input name={question._id} type="radio" value={question.option1.value} onChange={() => handleOptionSelect(question.option1.value)} checked={question.ChoosedOption === question.option1.value} />
              {question.option1.value}
            </li>
          </label>

          <label>
            <li className={`p-2 border rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500 flex items-center justify-start ${question.ChoosedOption === question.option2.value ? 'bg-lime-500' : 'bg-[#121418]'}`}>
              <input name={question._id} type="radio" value={question.option2.value} onChange={() => handleOptionSelect(question.option2.value)} checked={question.ChoosedOption === question.option2.value} />
              {question.option2.value}
            </li>
          </label>

          <label>
            <li className={`p-2 border rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500 flex items-center justify-start ${question.ChoosedOption === question.option3.value ? 'bg-lime-500' : 'bg-[#121418]'}`}>
              <input name={question._id} type="radio" value={question.option3.value} onChange={() => handleOptionSelect(question.option3.value)} checked={question.ChoosedOption === question.option3.value} />
              {question.option3.value}
            </li>
          </label>

          <label>
            <li className={`p-2 border rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500 flex items-center justify-start ${question.ChoosedOption === question.option4.value ? 'bg-lime-500' : 'bg-[#121418]'}`}>
              <input name={question._id} type="radio" value={question.option4.value} onChange={() => handleOptionSelect(question.option4.value)} checked={question.ChoosedOption === question.option4.value} />
              {question.option4.value}
            </li>
          </label>
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getQuestion } from "../apis/question";
import QuestionCard from "../components/ui/questionCard";
import { createResult } from "../apis/result";

const defaultData = {
  Questions: []
};

function Question() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [QuestionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30); // Initial time in seconds
  const pageRoute = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await getQuestion();
        if (data && data.length > 0) {
          setQuestionList(data);
          setFormData({
            Questions: data.map(question => ({
              QuestionId: question._id,
              ChoosedOption: ''
            }))
          });
        } else {
          toast.warning("No questions found.");
        }
      } catch (error) {
        toast.warning("Error fetching questions.");
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    let timer;
    if (currentIndex < QuestionList.length) {
      setRemainingTime(30);
      timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime === 1) {
            handleAnswer('');
            return 30;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(timer);
  }, [currentIndex, QuestionList]);

  const handleAnswer = (option) => {
    setFormData(prevData => {
      const updatedQuestions = [...prevData.Questions];
      updatedQuestions[currentIndex] = { 
        ...updatedQuestions[currentIndex], 
        ChoosedOption: option
      };
      return { ...prevData, Questions: updatedQuestions };
    });

    if (currentIndex < QuestionList.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      formSubmit();
    }
  };

  const formSubmit = async () => {
    const answeredQuestions = formData.Questions.filter(question => question.ChoosedOption !== '');
    if (answeredQuestions.length < QuestionList.length) {
      toast.warning("Please answer all questions before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await createResult(formData);
      if (data) {
        toast.success("Successfully submitted all your answers!");
        pageRoute('/result');
      }
    } catch (error) {
      toast.error("Failed to submit result!");
      console.error("Error submitting result:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#121418] flex justify-center items-center h-screen">
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div>
          <div className={`absolute border-4 top-0 right-0 m-4 p-4 font-bold text-3xl ${remainingTime < 10 ? 'text-rose-900' : 'text-white'}`}> Remaining Time: {remainingTime}</div>
        <div className="w-full sm:w-[600px] h-[400px] mt-20 relative">
          <div className="pl-4 text-white">
            {QuestionList.length > 0 ? (
              <QuestionCard
                question={QuestionList[currentIndex]}
                setSelected={(option) => handleAnswer(option)} 
              />
            ) : (
              "Question list empty!"
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Question;

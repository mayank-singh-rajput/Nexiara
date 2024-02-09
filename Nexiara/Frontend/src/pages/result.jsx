import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getResult } from "../apis/result";

function Result() {
  const [resultData, setResultData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const { data } = await getResult();
        if (data) {
          setResultData(data);
        } else {
          toast.warning("No Result found.");
        }
      } catch (error) {
        toast.error("Error fetching result.");
        console.error("Error fetching result:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    const logoutUser = () => {
      toast.success("Logout Successful!");
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    };
  
    logoutUser(); 
  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center text-white relative">
      {isSmallScreen && ( 
        <div className="absolute top-5 right-5 grid grid-cols-1 divide-y gap-y-4">
          <div className="dropdown">
            <button className="dropbtn" onClick={() => setShowButtons(!showButtons)}>&#9776;</button> {/* Toggle button visibility */}
            {showButtons && ( 
              <div className="dropdown-content">
                <button className="border-4 m-4 p-4 font-bold text-3xl" onClick={handlePrint}>Print</button>
                <button className="border-4 m-4 p-4 font-bold text-3xl" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
      {!isSmallScreen && (
        <div className="absolute top-5 right-5">
          <button
            className={`border-4 m-4 p-4 font-bold text-3xl`}
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            className={`border-4 m-4 p-4 font-bold text-3xl`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      <div className="w-full sm:w-full p-8 rounded-lg m-8 shadow-lg bg-gray-800">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold mb-8 text-center">
              User Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <strong className="text-lg">User ID:</strong>{" "}
                {resultData.userId._id}
              </div>
              <div>
                <strong className="text-lg">User Name:</strong>{" "}
                {resultData.userId.name}
              </div>
              <div>
                <strong className="text-lg">User Email:</strong>{" "}
                {resultData.userId.email}
              </div>
              <div>
                <strong className="text-lg">User PhoneNo:</strong>{" "}
                {resultData.userId.phoneNo}
              </div>
            </div>
            <div className="mb-8">
              <strong className="text-lg">Total Score:</strong>{" "}
              {resultData.total}
            </div>

            <h2 className="text-3xl font-semibold mb-8 text-center">
              Categorial Scores
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto mb-8 w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Point</th>
                  </tr>
                </thead>
                <tbody>
                  {resultData.categorialScore.map((question, index) => (
                    <tr key={index} className="bg-gray-700">
                      <td className="px-6 py-4">{question.category}</td>
                      <td className="px-6 py-4">{question.point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Overall Result
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left">Question</th>
                    <th className="px-6 py-3 text-left">Choosed Option</th>
                    <th className="px-6 py-3 text-left">Point</th>
                  </tr>
                </thead>
                <tbody>
                  {resultData.overallResult.map((question, index) => (
                    <tr key={index} className="bg-gray-700">
                      <td className="px-6 py-4">
                        {question.QuestionId.Question}
                      </td>
                      <td className="px-6 py-4">{question.ChoosedOption}</td>
                      <td className="px-6 py-4">{question.point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
